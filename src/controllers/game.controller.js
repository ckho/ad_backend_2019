import models from '../models';

class gameController {
  // List out all questions
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.GameQuestion.findAll().then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // Show it onto the screen
  async show(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.GameQuestion.findOne({
        where: {
          id: req.params.questionId
        }
      }).then(question => {
        if (!question) {
          return res.status(404).send({success: false, msg: 'Question not found.'});
        } else {
          //Screen Display
          res.screen.emit('current_page', 'game');
          models.Option.update({value: 'game'}, {where: {key: 'currentPage'}});

          res.screen.emit('game_current_question', question);
          models.Option.update({value: question.id}, {where: {key: 'currentGameQuestionId'}});
          res.screen.emit('game_empty_responses', null);
          models.GameQuestion.update({played: 1}, {where: {id: question.id}});

          return res.status(200).send({success:true});
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // Show next photo
  async nextResponse(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      //Screen Display
      res.screen.emit('game_next_response', null);

      return res.status(200).send({success: true});
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }

  // Show previous photo
  async previousResponse(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      //Screen Display
      res.screen.emit('game_previous_response', null);

      return res.status(200).send({success: true});
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new gameController();
