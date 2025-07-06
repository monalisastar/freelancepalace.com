// src/models/Evidence.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEvidence extends Document {
  disputeId: mongoose.Types.ObjectId;
  fileUrl: string;
  hash: string;
  uploadedAt: Date;
}

const EvidenceSchema = new Schema<IEvidence>(
  {
    disputeId: { type: Schema.Types.ObjectId, ref: 'Dispute', required: true },
    fileUrl: { type: String, required: true },
    hash: { type: String, required: true },
  },
  { timestamps: { createdAt: 'uploadedAt', updatedAt: false } }
);

export default mongoose.models.Evidence ||
  mongoose.model<IEvidence>('Evidence', EvidenceSchema);

