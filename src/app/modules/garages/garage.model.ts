import mongoose, { Schema } from 'mongoose';

const garageSchema = new Schema(
  {
    name: { type: String, required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String },
    contactNumber: { type: String, required: true },
    services: [{ type: String, default: 'oil' }], // e.g., ['repair', 'oil change', 'tire fix']
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Garage = mongoose.model('Garage', garageSchema);
