// src/models/Arbitrator.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IArbitrator extends Document {
  name: string;
  specialty: string;
  rating: number;
}

const ArbitratorSchema = new Schema<IArbitrator>(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Arbitrator ||
  mongoose.model<IArbitrator>('Arbitrator', ArbitratorSchema);

