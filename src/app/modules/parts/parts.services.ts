import { Part } from './parts.model';

interface IParts {
  name: string;
  category?: string;
  price: number;
  stock: number;
  description: string;
}

const createPartIntoDB = async (parts: IParts) => {
  const part = await Part.create(parts);

  return part;
};
const getAllPartIntoDB = async () => {
  const parts = await Part.find();

  return parts;
};
const getPartIntoDB = async (id: string) => {
  const part = await Part.findById(id);

  return part;
};
const updatePartIntoDB = async (id: string, parts: IParts) => {
  const part = await Part.findByIdAndUpdate(id, parts, { new: true });

  return part;
};
const deletePartIntoDB = async (id: string) => {
  const part = await Part.findByIdAndDelete(id);

  return part;
};

export const PartServices = {
  createPartIntoDB,
  getAllPartIntoDB,
  getPartIntoDB,
  updatePartIntoDB,
  deletePartIntoDB,
};
