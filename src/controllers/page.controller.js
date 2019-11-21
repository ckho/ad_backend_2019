import models from '../models';

class pageController {

  // List out all pages
  async index(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.Page.findAll({
        order: [
          ['order', 'ASC']
        ]
      }).then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
  async currentPage(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {  
      models.Option.findOne({
        where: {
          key: 'currentPageId'
        }
      }).then(result => {
        return res.json({success: true, result: result});
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
  // Show it onto the screen
  async show(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      //Screen Display
      res.screen.emit('current_page', req.params.pageName);
      models.Option.update({value: req.params.pageName}, {where: {key: 'currentPage'}});
      return res.status(200).send({success: true});
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
  // Show it onto the screen
  async showId(req, res) {
    if (req.user && req.user.username && (req.user.role == 3)) {
      models.Page.findOne({
        where: {
          id: req.params.pageId
        }
      }).then(page => {
        if (!page) {
          return res.status(404).send({success: false, msg: 'Page not found.'});
        } else {
          res.screen.emit('current_page', page.name);
          models.Option.update({value: page.name}, {where: {key: 'currentPage'}});
          models.Option.update({value: page.id}, {where: {key: 'currentPageId'}});
          return res.status(200).send({success: true});
        }
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  }
}

export default new pageController();
