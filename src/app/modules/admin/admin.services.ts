import QueryBuilder from '../../builder/QueryBuilder';
import { User } from '../auth/auth.models';

export interface IUserDetailsWithoutId extends Document {
  name?: string;
  address?: string;
  nidNumber?: string;
  phone?: string;
  image?: string;
  lastEducation?: string;
}

const getAllUserIntoDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(User.find(), query)
    .search(['email'])
    .filter()
    .sort()
    .paginate();
  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { result, meta };
};

const updateUserIntoDB = async (
  id: string,
  userData: IUserDetailsWithoutId,
) => {
  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const changeRole = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AdminServices = {
  getAllUserIntoDB,
  updateUserIntoDB,
  deleteUserFromDB,
  changeRole,
};
