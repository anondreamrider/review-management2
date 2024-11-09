import axios from 'axios';
import Review from '../models/Review';

export class GoogleService {
  private apiKey: string;
  private placeId: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY || '';
    this.placeId = process.env.GOOGLE_PLACE_ID || '';
  }

  async fetchGoogleReviews() {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=reviews&key=${this.apiKey}`;
      const response = await axios.get(url);
      
      if (response.data.result && response.data.result.reviews) {
        return response.data.result.reviews;
      }
      return [];
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      throw error;
    }
  }

  async syncReviews() {
    try {
      const googleReviews = await this.fetchGoogleReviews();
      
      for (const review of googleReviews) {
        await Review.findOneAndUpdate(
          { 'platformData.googleReviewId': review.time },
          {
            platform: 'Google',
            author: review.author_name,
            avatar: review.profile_photo_url || '/placeholder.svg',
            rating: review.rating,
            content: review.text,
            date: new Date(review.time * 1000),
            platformData: {
              googleReviewId: review.time,
              profileUrl: review.author_url
            }
          },
          { upsert: true, new: true }
        );
      }
      
      return { success: true, message: 'Reviews synced successfully' };
    } catch (error) {
      console.error('Error syncing reviews:', error);
      throw error;
    }
  }
}