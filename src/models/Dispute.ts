// src/models/Dispute.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IDispute extends Document {
  contractId: string;
  status: 'Open' | 'Under Review' | 'Resolved' | 'Escalated';
  type: string;
  summary: string;
  description: string;
  desiredOutcome: string;
  createdAt: Date;
  updatedAt: Date;
}

const DisputeSchema = new Schema<IDispute>(
  {
    contractId: { type: String, required: true },
    status: { type: String, default: 'Open' },
    type: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    desiredOutcome: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Dispute ||
  mongoose.model<IDispute>('Dispute', DisputeSchema);

