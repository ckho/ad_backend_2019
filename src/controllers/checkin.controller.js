import models from '../models';

class CheckinController {
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role >= 2)) {  
      models.Checkin.findAndCountAll({
        attributes: ['createdAt'],
        include: [{
          model: models.User,
          attributes: ['username', 'firstName', 'lastName']
        }],
        where: {
          eventId: req.params.eventId
        }
      }).then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async count(req, res) {
    if (req.user && req.user.username && (req.user.role >= 2)) {  
      models.Checkin.count({
        where: {
          eventId: req.params.eventId
        }
      }).then(c => {
        return res.json({success: true, count: c});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async show(req, res) {
    if (req.user && req.user.username && (req.user.role >= 2)) {
      models.User.findOne({
        where: {
          username: req.params.username
        }
      }).then(user => {
        if (!user) {
          return res.status(404).send({success: false, msg: 'User not found.'});
        } else {
          models.Checkin.findOne({
            where:{
              UserId: user.id,
              eventId: req.params.eventId
            }
          }).then(checkin => {
            if (!checkin) {
              return res.status(200).send({result: false});
            } else {
              return res.status(200).send({result: true});
            }
          });
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async create(req, res) {
    if (req.user && req.user.username && (req.user.role >= 2)) {  
      models.User.findOne({
        where: {
          username: req.params.username
        }
      }).then(user => {
        if (!user) {
          return res.status(404).send({success: false, msg: 'User not found.'});
        } else {
          models.Checkin.findOne({
            where:{
              UserId: user.id,
              eventId: req.params.eventId
            }
          }).then(checkin => {
            if (!checkin) {
              models.User.update({isCheckedIn: 1}, {where: {id: user.id}});
              models.Checkin.create({
                UserId: user.id,
                eventId: req.params.eventId
              }).then(checkin => {
                return res.json({success: true, msg: 'User checked in.', username: user.username, name: user.lastName + ', ' + user.firstName, isAwardee: user.isAwardee});
              }).catch(err => {
                return res.json({success: false, msg: 'Error'});
              });
            } else {
              return res.json({success: true, msg: 'User already checked in.', username: user.username, name: user.lastName + ', ' + user.firstName, isAwardee: user.isAwardee});
            }
          });
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  async remove(req, res) {
    if (req.user && req.user.username && (req.user.role >= 2)) {  
      models.User.findOne({
        where: {
          username: req.params.username
        }
      }).then(user => {
        if (!user) {
          return res.status(404).send({success: false, msg: 'User not found.'});
        } else {
          models.User.update({isCheckedIn: 0}, {where: {id: user.id}});
          models.Checkin.destroy({
            where:{
              UserId: user.id,
              eventId: req.params.eventId
            }
          }).then(checkin => {
            if (!checkin) {
              return res.json({success: false, msg: 'Checked in not existed.', username: user.username, name: user.lastName + ', ' + user.firstName, isAwardee: user.isAwardee});
            } else {
              return res.json({success: true, msg: 'Checkin deleted.', username: user.username, name: user.lastName + ', ' + user.firstName, isAwardee: user.isAwardee});
            }
          });        
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new CheckinController();
