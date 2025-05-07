import { CarRepair } from './carRepair.model';

interface CarIssueReport {
    user: string; // or ObjectId if you're using Mongoose
    licensePlate: string;
    carModel: string;
    problemDescription: string;
  }

const createUserIntoDB = async (carInfo:CarIssueReport) => {
  // Check if the user already exists by email
  const newRepair = await CarRepair.create({
    user: carInfo.user,
    licensePlate: carInfo.licensePlate,
    carModel: carInfo.carModel,
    problemDescription: carInfo.problemDescription,
  });

  return newRepair;
};

export const UserServices = {
  createUserIntoDB,
  ,
};
