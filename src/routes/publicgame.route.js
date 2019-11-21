import publicGameController from '../controllers/publicgame.controller';
import express from 'express';
import upload from '../config/multer';

const router = express.Router();
 
router.post('/upload', upload.single('photo'), publicGameController.upload);
router.get('/current', publicGameController.currentStatus);
 
export default router;
