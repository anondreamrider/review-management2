import { Request, Response } from 'express';
import PlatformIntegration from '../models/PlatformIntegration';
import { PlatformServiceFactory } from '../services/PlatformServiceFactory';


/**
 * Toggle a platform's integration status and update its credentials
 */
export const togglePlatform = async (req: Request, res: Response): Promise<void> => {
  try {
    const { platform, isEnabled, credentials } = req.body;

    // Validate the request body
    if (typeof platform !== 'string' || typeof isEnabled !== 'boolean' || typeof credentials !== 'object') {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }


    const integration = await PlatformIntegration.findOneAndUpdate(
      { platform },
      { isEnabled, credentials },
      { upsert: true, new: true }
    );
    
    res.json(integration);
  } catch (error) {

    res.status(500).json({ message: 'Error updating platform integration', error });
  }
};

/**
 * Sync reviews for a specific platform
 */
export const syncPlatformReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { platform } = req.params;

    if (typeof platform !== 'string') {
      res.status(400).json({ message: 'Invalid platform parameter' });
      return;
    }

    const integration = await PlatformIntegration.findOne({ platform });

    if (!integration || !integration.isEnabled) {
      res.status(400).json({ message: 'Platform not enabled' });
      return;
    }

    const service = PlatformServiceFactory.createService(platform, integration.credentials);
    const result = await service.syncReviews();

    await PlatformIntegration.findOneAndUpdate(
      { platform },
      { lastSync: new Date() }
    );

   
    res.json(result);
  } catch (error) {

    res.status(500).json({ message: 'Error syncing reviews', error });
  }
};

