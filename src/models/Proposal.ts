import mongoose, { Schema } from 'mongoose';

const ProposalSchema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    freelancerEmail: { type: String, required: true },
    freelancerName: { type: String, required: true },
    proposalText: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Proposal || mongoose.model('Proposal', ProposalSchema);

