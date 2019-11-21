import gameController from '../controllers/game.controller';
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();
 
router.get('/list', passportManager.authenticate, gameController.index);
router.get('/:questionId', passportManager.authenticate, gameController.show);
router.get('/:questionId/next', passportManager.authenticate, gameController.nextResponse);
router.get('/:questionId/previous', passportManager.authenticate, gameController.previousResponse);
 
export default router;
