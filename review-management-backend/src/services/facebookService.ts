import axios from 'axios';
import Review from '../models/Review';

export class FacebookService {
  private accessToken: string;
  private pageId: string;

  constructor(credentials: { accessToken: string; pageId: string }) {
    this.accessToken = credentials.accessToken;
    this.pageId = credentials.pageId;
  }

  async fetchFacebookReviews() {
    try {
      const url = `https://graph.facebook.com/${this.pageId}/ratings?access_token=${this.accessToken}`;
      const response = await axios.get(url);
      
      if (response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching Facebook reviews:', error);
      throw error;
    }
  }

  async syncReviews() {
    try {
      const facebookReviews = await this.fetchFacebookReviews();
      
      for (const review of facebookReviews) {
        await Review.findOneAndUpdate(
          { 'platformData.facebookReviewId': review.recommendation_type },
          {
            platform: 'Facebook',
            author: review.reviewer.name,
            avatar: review.reviewer.picture.data.url || '/placeholder.svg',
            rating: review.rating,
            content: review.review_text,
            date: new Date(review.created_time),
            platformData: {
              facebookReviewId: review.recommendation_type,
              profileUrl: `https://facebook.com/${review.reviewer.id}`
            }
          },
          { upsert: true, new: true }
        );
      }
      
      return { success: true, message: 'Facebook reviews synced successfully' };
    } catch (error) {
      console.error('Error syncing Facebook reviews:', error);
      throw error;
    }
  }
}