import models from '../models';

const Op = models.Sequelize.Op;

class LuckyDrawController {
  // List out all gifts
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.LuckyDrawGift.findAll().then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // Show it onto the screen
  async show(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.LuckyDrawGift.findOne({
        where: {
          id: req.params.giftId
        }
      }).then(gift => {
        if (!gift) {
          return res.status(404).send({success: false, msg: 'Gift not found.'});
        } else {
          //Screen Display
          res.screen.emit('current_page', 'lucky_draw');
          models.Option.update({value: 'lucky_draw'}, {where: {key: 'currentPage'}});

          res.screen.emit('luckydraw_current_gift', gift);
          res.screen.emit('luckydraw_empty_winners', null);

          return res.status(200).send({success:true});
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async draw(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.LuckyDrawGift.findOne({
        where: {
          id: req.params.giftId
        }
      }).then(gift => {
        if (!gift) {
          return res.status(404).send({success: false, msg: 'Gift not found.'});
        } else {
          models.User.findAll({
            order: models.sequelize.random(), 
            limit: req.body.winnerCount,
            where: {
              isWinner: false,
              isRegistered: true,
              isCheckedIn: true
            },
            attributes: ['id', 'username', 'firstName', 'lastName']
          }).then(winners => {
            winners.forEach(winner => {
              models.LuckyDrawWinner.create({
                UserId: winner.id,
                LuckyDrawGiftId: gift.id,
                removed: false
              });
              models.User.update({isWinner: 1}, {where: {id: winner.id}});
            });
            models.LuckyDrawGift.update({drawed: 1}, {where: {id: gift.id}});
            //Screen Display
            res.screen.emit('current_page', 'lucky_draw');
            models.Option.update({value: 'lucky_draw'}, {where: {key: 'currentPage'}});

            res.screen.emit('luckydraw_current_gift', gift);
            res.screen.emit('luckydraw_add_winners', winners);
            
            return res.status(200).send({success: true, winners: winners});
          }); 
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async redraw(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.LuckyDrawGift.findOne({
        where: {
          id: req.params.giftId
        }
      }).then(gift => {
        if (!gift) {
          return res.status(404).send({success: false, msg: 'Gift not found.'});
        } else {
          models.LuckyDrawWinner.update({
            removed: true
          },{
            where: {
              LuckyDrawGiftId: gift.id,
              UserId: {
                [Op.in]: req.body.removedWinnersId
              }
            }
          });
          
          models.User.findAll({
            order: models.sequelize.random(),
            limit: req.body.removedWinnersId.length,
            where: {
              isWinner: false,
              isRegistered: true,
              isCheckedIn: true
            },
            attributes: ['id', 'username', 'firstName', 'lastName']
          }).then(winners => {
            winners.forEach(winner => {
              models.LuckyDrawWinner.create({
                UserId: winner.id,
                LuckyDrawGiftId: gift.id,
                removed: false
              });
              models.User.update({isWinner: 1}, {where: {id: winner.id}});
            });

            //Screen Display
            res.screen.emit('current_page', 'lucky_draw');
            models.Option.update({value: 'lucky_draw'}, {where: {key: 'currentPage'}});

            res.screen.emit('luckydraw_current_gift', gift);
            res.screen.emit('luckydraw_remove_winners', req.body.removedWinnersId);
            res.screen.emit('luckydraw_add_winners', winners);
            
            return res.status(200).send({success: true, winners: winners});
          });
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new LuckyDrawController();
