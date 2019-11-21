import publicCheckinController from '../controllers/publiccheckin.controller';
import express from 'express';

const router = express.Router();
 
router.post('/', publicCheckinController.checkin);
 
export default router;
