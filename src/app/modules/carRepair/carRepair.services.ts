import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.models';
import { CarRepair } from './carRepair.model';

import { Types } from 'mongoose';
import { Garage } from '../garages/garage.model';
import { Part } from '../parts/parts.model';

interface PartItem extends Document {
  part: Types.ObjectId;
  quantity: number;
}

interface StatusChange {
  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  changedAt?: Date;
  changedBy?: Types.ObjectId;
}

export interface RepairJob {
  customer: Types.ObjectId;
  createdBy: Types.ObjectId;
  technician?: Types.ObjectId | null;

  licensePlate: string;
  carModel: string;
  problemDescription: string;
  technicianNotes?: string;

  partsNeeded: PartItem[];

  estimatedCost?: number;
  estimatedDays?: number;
  estimatedCompletionDate?: Date;
  completedAt?: Date;

  status: 'pending' | 'assigned' | 'in_progress' | 'completed';

  garage?: Types.ObjectId;

  statusHistory?: StatusChange[];
}
export interface ITechnicianUpdate {
  technician?: Types.ObjectId | null;

  technicianNotes?: string;

  partsNeeded?: PartItem[];

  estimatedCost?: number;
  estimatedDays?: number;
  estimatedCompletionDate?: Date;
  completedAt?: Date;

  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
}

const createCarRepairServiceIntoDB = async (carInfo: RepairJob) => {
  const customerData = await User.findOne({ email: carInfo.customer });
  if (!customerData) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid User');
  }

  // Validate garage
  const foundGarage = await Garage.findById(carInfo.garage);
  if (!foundGarage) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Garage not found');
  }

  // Validate parts
  let validParts;
  if (carInfo.partsNeeded) {
    validParts = await Promise.all(
      carInfo.partsNeeded.map(async (p: PartItem) => {
        const partDoc = await Part.findById(p.part);
        if (!partDoc) throw new Error(`Part not found: ${p.part}`);
        return { part: p.part, quantity: p.quantity };
      }),
    );
    return validParts;
  }

  const newRepair = await CarRepair.create({
    customer: customerData?._id,
    createdBy: carInfo.createdBy, // assuming you have user in request
    licensePlate: carInfo.licensePlate,
    carModel: carInfo.carModel,
    problemDescription: carInfo.problemDescription,
    garage: foundGarage,
    partsNeeded: validParts,
  });

  return newRepair;
};
const technicianUpdateRepair = async (
  repairId: string,
  userId: string,
  payload: ITechnicianUpdate,
) => {
  const repair = await CarRepair.findById(repairId);
  if (!repair) throw new AppError(httpStatus.NOT_ACCEPTABLE, ' not found');

  if (userId !== repair.technician.toString()) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, ' not authorized');
  }

  if (payload.technicianNotes) {
    repair.technicianNotes = payload.technicianNotes;
  }

  if (payload.status) {
    if (!['in_progress', 'completed'].includes(payload.status)) {
      throw new AppError(httpStatus.NOT_ACCEPTABLE, ' Invalid status');
    }
    repair.status = payload.status;

    if (payload.status === 'completed') {
      repair.completedAt = new Date();
    }
  }

  if (payload.status) {
    repair.status = payload.status;
    repair.statusHistory.push({
      status: payload.status,
      changedBy: userId,
    });
  }
  if (payload.estimatedDays) {
    repair.estimatedDays = payload.estimatedDays as number;
  }

  let totalCost = 0;

  if (payload.partsNeeded && Array.isArray(payload.partsNeeded)) {
    for (const item of payload.partsNeeded) {
      const partDoc = await Part.findById(item.part);
      if (!partDoc) throw new Error(`Part not found: ${item.part}`);

      const index = repair.partsNeeded.findIndex(
        (p: any) => p.part.toString() === item.part,
      );

      if (index > -1) {
        // If part already exists, update quantity
        repair.partsNeeded[index].quantity += item.quantity;
      } else {
        // Add new part entry
        repair.partsNeeded.push({ part: item.part, quantity: item.quantity });
      }

      // Add to total cost
      totalCost += partDoc.price * item.quantity;
    }
  }

  // Add current cost to existing estimate
  repair.estimatedCost += totalCost;

  await repair.save();

  return repair;
};
const assignTechnicianCarRepairServiceIntoDB = async (
  carRepairId: string,
  technicianId: string,
  assignId: string,
) => {
  const repair = await CarRepair.findById(carRepairId);
  if (!repair) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid User');
  }

  repair.technician = new Types.ObjectId(technicianId);
  repair.status = 'assigned';
  repair.assignedBy = assignId as unknown as Types.ObjectId;
  await repair.save();

  return repair;
};

export const CarRepairServices = {
  createCarRepairServiceIntoDB,
  assignTechnicianCarRepairServiceIntoDB,
  technicianUpdateRepair,
};
