import { Request, Response } from 'express';
import Review from '../models/Review';

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const { platform } = req.query;
    const query = platform && platform !== 'All' ? { platform } : {};
    const reviews = await Review.find(query).sort({ date: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};