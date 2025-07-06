// src/models/Alert.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  disputeId: mongoose.Types.ObjectId;
  type: string;
  createdAt: Date;
}

const AlertSchema = new Schema<IAlert>(
  {
    disputeId: { type: Schema.Types.ObjectId, ref: 'Dispute', required: true },
    type: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Alert ||
  mongoose.model<IAlert>('Alert', AlertSchema);

