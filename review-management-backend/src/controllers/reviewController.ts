import { Request, Response } from 'express';
import { GoogleService } from '../services/googleService';
import Review from '../models/Review';

export const syncGoogleReviews = async (req: Request, res: Response) => {
  try {
    const googleService = new GoogleService();
    const result = await googleService.syncReviews();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error syncing Google reviews', error });
  }
};

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

export const addReview = async (req: Request, res: Response) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error adding review' });
  }
};

export const updateReviewResponse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userResponse } = req.body;
    
    const review = await Review.findByIdAndUpdate(
      id,
      { userResponse },
      { new: true }
    );
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: 'Error updating review response' });
  }
};