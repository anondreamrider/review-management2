import express from 'express';
import { getAllReviews, syncGoogleReviews } from '../controllers/reviewController';

const router = express.Router();

router.get('/', getAllReviews);
router.post('/sync-google', syncGoogleReviews);

export default router;