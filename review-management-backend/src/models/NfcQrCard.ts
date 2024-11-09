import mongoose, { Schema, Document } from 'mongoose';

export interface INfcQrCard extends Document {
  name: string;
  qrCodeUrl: string;
  redirectUrl: string;
  customLink: string;
  clickCount: number;
  lastClicked: Date | null;
  customizationSlots: Array<{
    slotName: string;
    slotValue: string;
  }>;
  imageType: 'qr' | '3d_nfc';
  imageUrl: string;
  createdAt: Date;
}

const NfcQrCardSchema = new Schema<INfcQrCard>({
  name: { type: String, required: true },
  qrCodeUrl: { type: String, required: true },
  redirectUrl: { type: String, required: true },
  customLink: { type: String, default: '' },
  clickCount: { type: Number, default: 0 },
  lastClicked: { type: Date, default: null },
  customizationSlots: [{
    slotName: String,
    slotValue: String
  }],
  imageType: { type: String, enum: ['qr', '3d_nfc'], default: 'qr' },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<INfcQrCard>('NfcQrCard', NfcQrCardSchema);