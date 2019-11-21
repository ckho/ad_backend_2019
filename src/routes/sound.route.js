import soundController from "../controllers/sound.controller";
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();
 
router.get('/list', passportManager.authenticate, soundController.index);
router.get('/:soundId', passportManager.authenticate, soundController.play);
 
export default router;
