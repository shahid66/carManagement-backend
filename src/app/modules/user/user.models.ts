import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDetails extends Document {
  user: mongoose.Types.ObjectId;
  address?: string;
  nidNumber?: string;
  phone?: string;
  image?: string;
  lastEducation?: string;
}

const userDetailsSchema = new Schema<IUserDetails>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    address: { type: String },
    nidNumber: { type: String },
    phone: { type: String },
    image: { type: String },
    lastEducation: { type: String },
  },
  {
    timestamps: true,
  }
);

export const UserDetails = mongoose.model<IUserDetails>('UserDetails', userDetailsSchema);
