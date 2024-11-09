import mongoose, { Schema, Document } from 'mongoose';

export interface INfcQrData extends Document {
  tagId: string;
  data: string;
  createdAt: Date;
  updatedAt: Date;
}

const NfcQrDataSchema = new Schema<INfcQrData>({
  tagId: { type: String, required: true, unique: true },
  data: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<INfcQrData>('NfcQrData', NfcQrDataSchema);