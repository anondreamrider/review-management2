import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  platform: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: Date;
  aiResponse?: string;
  userResponse?: string;
  platformData: {
    googleReviewId?: string;
    yelpReviewId?: string;
    facebookReviewId?: string;
    profileUrl?: string;
  };
  sentiment?: string;
  isResponded: boolean;
}

const ReviewSchema = new Schema({
  platform: { type: String, required: true },
  author: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  aiResponse: String,
  userResponse: String,
  platformData: {
    googleReviewId: String,
    yelpReviewId: String,
    facebookReviewId: String,
    profileUrl: String
  },
  sentiment: String,
  isResponded: { type: Boolean, default: false }
});

export default mongoose.model<IReview>('Review', ReviewSchema);