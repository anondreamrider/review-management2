import { GoogleService } from './googleService';
import { YelpService } from './yelpService';
import { FacebookService } from './facebookService';

export class PlatformServiceFactory {
  // Create a service based on the platform name and credentials
  static createService(platform: string, credentials: any) {
    // Validate credentials based on platform
    if (!credentials) {
      throw new Error(`Credentials are required for platform: ${platform}`);
    }

    switch (platform.toLowerCase()) {
      case 'google':
        if (!credentials.apiKey) {
          throw new Error('Google platform requires an API key.');
        }
        return new GoogleService(credentials);

      case 'yelp':
        if (!credentials.businessId || !credentials.accessToken) {
          throw new Error('Yelp platform requires a businessId and accessToken.');
        }
        return new YelpService(credentials);

      case 'facebook':
        if (!credentials.accessToken) {
          throw new Error('Facebook platform requires an accessToken.');
        }
        return new FacebookService(credentials);

      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}
