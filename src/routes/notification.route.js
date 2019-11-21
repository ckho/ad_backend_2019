import notificationController from "../controllers/notification.controller";
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();
 
router.post('/ios', passportManager.authenticate, notificationController.ios);
// router.post('/android', passportManager.authenticate, luckyDrawController.show);
 
export default router;
