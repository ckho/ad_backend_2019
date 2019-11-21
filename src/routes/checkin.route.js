import checkinController from "../controllers/checkin.controller";
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();
 
router.get('/:eventId', passportManager.authenticate, checkinController.index);
router.get('/:eventId/count', passportManager.authenticate, checkinController.count);
router.get('/:eventId/:username', passportManager.authenticate, checkinController.show);
router.post('/:eventId/:username', passportManager.authenticate, checkinController.create);
router.delete('/:eventId/:username', passportManager.authenticate, checkinController.remove);
 
export default router;
