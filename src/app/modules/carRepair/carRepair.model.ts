import mongoose, { Schema } from 'mongoose';

const carRepairSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  technician: { type: Schema.Types.ObjectId, ref: 'User', default: null },

  licensePlate: { type: String, required: true },
  carModel: { type: String, required: true },
  problemDescription: { type: String, required: true }, // from user

  technicianNotes: { type: String, default: '' }, // exact problem found
  partsNeeded: [{ type: String }], // ['engine oil', 'tube']
  estimatedCost: { type: Number, default: 0 },
  estimatedDays: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_progress', 'completed'],
    default: 'pending',
  },

  createdAt: { type: Date, default: Date.now },
});

export const CarRepair = mongoose.model('CarRepair', carRepairSchema);
