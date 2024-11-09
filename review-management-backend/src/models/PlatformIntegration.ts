import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the platform integration schema
export interface IPlatformIntegration extends Document {
  platform: string;
  isEnabled: boolean;
  credentials: {
    apiKey?: string;
    placeId?: string;
    businessId?: string;
    accessToken?: string;
  };
  lastSync: Date;
}

// Schema definition for PlatformIntegration
const PlatformIntegrationSchema = new Schema<IPlatformIntegration>({
  platform: { type: String, required: true, unique: true },
  isEnabled: { type: Boolean, default: false },
  credentials: {
    apiKey: { type: String },
    placeId: { type: String },
    businessId: { type: String },
    accessToken: { type: String }
  },
  lastSync: { type: Date }
});

export default mongoose.model<IPlatformIntegration>('PlatformIntegration', PlatformIntegrationSchema);
