import luckyDrawController from "../controllers/luckydraw.controller";
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();
 
router.get('/list', passportManager.authenticate, luckyDrawController.index);
router.get('/:giftId', passportManager.authenticate, luckyDrawController.show);
router.post('/:giftId', passportManager.authenticate, luckyDrawController.draw);
router.put('/:giftId', passportManager.authenticate, luckyDrawController.redraw);
 
export default router;
