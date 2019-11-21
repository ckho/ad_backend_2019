import awardController from '../controllers/award.controller';
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();
 
router.get('/list', passportManager.authenticate, awardController.index);
router.get('/awardeeList', passportManager.authenticate, awardController.listAwardee);
 
export default router;
