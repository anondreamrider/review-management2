import express from 'express';
import { connectGoogleAccount, syncGoogleReviews } from '../controllers/googleController';

const router = express.Router();

router.post('/connect', connectGoogleAccount);
router.post('/sync-reviews', syncGoogleReviews);

export default router;