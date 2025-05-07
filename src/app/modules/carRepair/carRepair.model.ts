import mongoose, { Schema } from 'mongoose';

const carRepairSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  technician: { type: Schema.Types.ObjectId, ref: 'User', default: null },

  licensePlate: { type: String, required: true },
  carModel: { type: String, required: true },
  problemDescription: { type: String, required: true },
  technicianNotes: { type: String, default: '' },

  partsNeeded: {
    type: [
      {
        part: { type: Schema.Types.ObjectId, ref: 'Part' },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  },

  estimatedCost: { type: Number, default: 0 },
  estimatedDays: { type: Number, default: 0 },
  estimatedCompletionDate: { type: Date },
  completedAt: { type: Date },

  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_progress', 'completed'],
    default: 'pending',
  },

  garage: { type: Schema.Types.ObjectId, ref: 'Garage' },

  statusHistory: [
    {
      status: {
        type: String,
        enum: ['pending', 'assigned', 'in_progress', 'completed'],
      },
      changedAt: { type: Date, default: Date.now },
      changedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

export const CarRepair = mongoose.model('CarRepair', carRepairSchema);
