import axios from 'axios';
import Review from '../models/Review';

export class YelpService {
  private apiKey: string;
  private businessId: string;

  constructor(credentials: { apiKey: string; businessId: string }) {
    this.apiKey = credentials.apiKey;
    this.businessId = credentials.businessId;
  }

  async fetchYelpReviews() {
    try {
      const url = `https://api.yelp.com/v3/businesses/${this.businessId}/reviews`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      
      if (response.data.reviews) {
        return response.data.reviews;
      }
      return [];
    } catch (error) {
      console.error('Error fetching Yelp reviews:', error);
      throw error;
    }
  }

  async syncReviews() {
    try {
      const yelpReviews = await this.fetchYelpReviews();
      
      for (const review of yelpReviews) {
        await Review.findOneAndUpdate(
          { 'platformData.yelpReviewId': review.id },
          {
            platform: 'Yelp',
            author: review.user.name,
            avatar: review.user.image_url || '/placeholder.svg',
            rating: review.rating,
            content: review.text,
            date: new Date(review.time_created),
            platformData: {
              yelpReviewId: review.id,
              profileUrl: review.url
            }
          },
          { upsert: true, new: true }
        );
      }
      
      return { success: true, message: 'Yelp reviews synced successfully' };
    } catch (error) {
      console.error('Error syncing Yelp reviews:', error);
      throw error;
    }
  }
}