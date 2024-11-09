import express from 'express';
import { togglePlatform, syncPlatformReviews } from '../controllers/platformController';

const router = express.Router();

router.post('/toggle', togglePlatform);
router.post('/sync/:platform', syncPlatformReviews);

export default router;