import pageController from "../controllers/page.controller";
import express from 'express';
import passportManager from '../config/passport';

const router = express.Router();

router.get('/list', passportManager.authenticate, pageController.index);
router.get('/currentPage', passportManager.authenticate, pageController.currentPage);
router.get('/id/:pageId', passportManager.authenticate, pageController.showId);
router.get('/:pageName', passportManager.authenticate, pageController.show);
 
export default router;
