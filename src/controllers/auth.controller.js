import models from '../models';

const jwt = require('jsonwebtoken');
 
class Auth {
  signUp(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      models.User.create({
        username: req.body.username,
        password: req.body.password
      }).then(user => {
        res.json({success: true, msg: 'Successful created new user.'});
      }).catch(err => {
        console.log(err);
        res.json({success: false, msg: 'Username already exists.'});
      });
    }
  }
  signIn(req, res) {
    models.User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if(!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        if (req.body.password == user.password) {
          var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY,{ expiresIn: '90d' });
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      }
    }).catch(err => {
      throw err;
    });
  }
}
 
export default new Auth();
