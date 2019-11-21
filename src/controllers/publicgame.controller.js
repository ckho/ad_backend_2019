import models from '../models';
import s3 from '../config/s3';
import stream from 'stream';
import moment from 'moment-timezone';
import xss from 'xss';

class publicGameController {
  async upload(req, res) {
    const s3Client = s3.s3Client;
    const params = s3.uploadParams;
    params.Key = Math.random().toString(36).substring(2, 15) + xss(req.file.originalname);
    params.Body = req.file.buffer;
    params.ACL = 'public-read';
    params.ContentType = 'image/jpeg';
    models.Option.findOne({
      where: {
        key: 'currentPage'
      }
    }).then(currentPage => {
      if (currentPage.value != 'game') {
        return res.status(500).send({success: false, msg: 'Error'});
      } else {
        models.Option.findOne({
          where: {
            key: 'currentGameQuestionId'
          }
        }).then(currentGameQuestionId => {
          if (currentGameQuestionId == 0) {
            return res.status(500).send({success: false, msg: 'Error'});
          } else {
            s3Client.upload(params, (err, data) => {
              if (err) {
                return res.status(500).send({success: false, msg: 'Error'});
              }
              models.GameResponse.create({
                imageUrl: data.Location,
                groupName: xss(req.body.groupName),
                message: xss(req.body.message),
                GameQuestionId: currentGameQuestionId.value,
                uploadTime: moment().tz('Asia/Hong_Kong').format('MMMM Do YYYY, h:mm:ss a')
              }).then(response => {
                //Screen Display
                res.screen.emit('game_add_response', response);

                return res.status(200).send({success: true});
              }).catch(err => {
                return res.status(500).send({success: false, msg: 'Error'});
              });
            });
          }
        });
      }
    });
  }

  async currentStatus(req, res) {
    models.Option.findOne({
      where: {
        key: 'currentPage'
      }
    }).then(currentPage => {
      if (currentPage.value != 'game') {
        return res.status(200).send({success: true, currentStatus: 0});
      } else {
        models.Option.findOne({
          where: {
            key: 'currentGameQuestionId'
          }
        }).then(currentGameQuestionId => {
          return res.status(200).send({success: true, currentGameQuestionId: currentGameQuestionId.value});
        });
      }
    });
  }
}

export default new publicGameController();
