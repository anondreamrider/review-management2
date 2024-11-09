import express from 'express';
import { getAllReviews } from '../controllers/reviewController';

const router = express.Router();

router.get('/', getAllReviews);

export default router;