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
  platformData?: {
    googleReviewId?: string;
    profileUrl?: string;
  };
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
    profileUrl: String
  }
});

export default mongoose.model<IReview>('Review', ReviewSchema);