import mongoose, { Schema } from 'mongoose';

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: String, required: true },
    deadline: { type: String, required: true },
    tags: { type: String },
    clientEmail: { type: String, required: true },
    applicants: { type: Number, default: 0 },
    status: { type: String, default: 'Open' },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model('Job', JobSchema);

