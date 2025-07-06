// src/models/Message.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  disputeId: mongoose.Types.ObjectId;
  senderId: string;
  content: string;
  attachments: string[];
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    disputeId: { type: Schema.Types.ObjectId, ref: 'Dispute', required: true },
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    attachments: [{ type: String }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.Message ||
  mongoose.model<IMessage>('Message', MessageSchema);

