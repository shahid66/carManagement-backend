import { Garage } from './garage.model';

interface ServiceCenter {
  name: string;
  division: string;
  district: string;
  address?: string;
  contactNumber: string;
  services: string[]; // e.g., ['repair', 'oil change']
  isActive?: boolean; // default is true
}

const createGarageIntoDB = async (garageData: ServiceCenter) => {
  const garage = await Garage.create(garageData);

  return garage;
};

const getAllGarageIntoDB = async () => {
  const garages = await Garage.find();

  return garages;
};
const getGarageIntoDB = async (id: string) => {
  const garage = await Garage.findById(id);

  return garage;
};
const updateGarageIntoDB = async (id: string, parts: ServiceCenter) => {
  const garage = await Garage.findByIdAndUpdate(id, parts, { new: true });

  return garage;
};
const deleteGarageIntoDB = async (id: string) => {
  const garage = await Garage.findByIdAndDelete(id);

  return garage;
};
export const GarageServices = {
  createGarageIntoDB,
  getAllGarageIntoDB,
  getGarageIntoDB,
  updateGarageIntoDB,
  deleteGarageIntoDB,
};
