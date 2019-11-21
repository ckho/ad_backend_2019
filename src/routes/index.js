import express from 'express';
import pageRouter from './page.route';
import authRouter from './auth.route';
import checkinRouter from './checkin.route';
import luckyDrawRouter from './luckydraw.route'; 
import publicGameRouter from './publicgame.route';
import gameRouter from './game.route';
import publicCheckinRouter from './publiccheckin.route';
import soundRouter from './sound.route';
import awardRouter from './award.route';
 
const router = express.Router();

router.use('/api/page', pageRouter);
router.use('/api/auth', authRouter);
router.use('/api/checkin', checkinRouter);
router.use('/api/luckydraw', luckyDrawRouter);
router.use('/api/public/game', publicGameRouter);
router.use('/api/game', gameRouter);
router.use('/api/public/checkin',publicCheckinRouter);
router.use('/api/award', awardRouter);
router.use('/api/sound', soundRouter);
 
export default router;
