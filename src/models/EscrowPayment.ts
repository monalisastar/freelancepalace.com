// src/models/EscrowPayment.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEscrowPayment extends Document {
  contractId: string;
  freelancer: string;
  amount: number;
  status: 'Held' | 'Released' | 'Refunded';
  createdAt: Date;
  releasedAt?: Date;
}

const EscrowPaymentSchema = new Schema<IEscrowPayment>(
  {
    contractId:   { type: String, required: true },
    freelancer:   { type: String, required: true },
    amount:       { type: Number, required: true },
    status:       { type: String, enum: ['Held','Released','Refunded'], default: 'Held' },
    releasedAt:   { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.EscrowPayment ||
  mongoose.model<IEscrowPayment>('EscrowPayment', EscrowPaymentSchema);

