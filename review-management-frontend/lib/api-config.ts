export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  ENDPOINTS: {
    REVIEWS: '/reviews',
    SYNC_GOOGLE: '/reviews/sync-google',
    REVIEW_REPLY: (reviewId: string) => `/reviews/${reviewId}/reply`,
  }
}; 