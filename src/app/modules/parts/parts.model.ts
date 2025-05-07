import mongoose, { Schema } from 'mongoose';

const partSchema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['oil', 'tube', 'engine', 'filter', 'battery', 'other'],
      default: 'other',
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Part = mongoose.model('Part', partSchema);
