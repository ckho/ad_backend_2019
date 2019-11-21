import models from '../models';

class publicCheckinController {
  async checkin(req, res) {
    models.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (!user) {
        return res.status(404).send({success: false, msg: 'User not found.'});
      } else {
        models.Checkin.findOne({
          where:{
            UserId: user.id,
            eventId: req.body.eventId
          }
        }).then(checkin => {
          if (!checkin) {
            models.User.update({isCheckedIn: 1}, {where: {id: user.id}});
            models.Checkin.create({
              UserId: user.id,
              eventId: req.body.eventId
            }).then(checkin => {
              return res.json({success: true, msg: 'User checked in.', upgraded: user.upgrade});

            }).catch(err => {
              return res.json({success: false, msg: 'Error'});
            });
          } else {
            return res.json({success: true, msg: 'User already checked in.', isAwardee: user.isAwardee});
          }
        });
      }
    });
  }
}

export default new publicCheckinController();
