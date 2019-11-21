import models from '../models';

class soundController {

  // List out all sounds
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.Sound.findAll().then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // Play audio
  async play(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      //Screen Display
      res.screen.emit('play_sound', req.params.soundId);

      return res.status(200).send({success: true});
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new soundController();
