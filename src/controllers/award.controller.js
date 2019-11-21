import models from '../models';

class awardController {
  // List out all awards
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.Award.findAll().then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // List out all awardees
  async listAwardee(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.Awardee.findAll({
        include: [
          {model: models.User}, 
          {model: models.Award}
        ]
      }).then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new awardController();
