import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { IUser, User } from '../auth/auth.models';
import { AuthServices } from '../auth/auth.service';
import { UserDetails } from './user.models';

export interface IUserDetailsWithoutId extends Document {
  name?: string;
  address?: string;
  nidNumber?: string;
  phone?: string;
  image?: string;
  lastEducation?: string;
}

const createUserIntoDB = async (userData: IUser) => {
  // Check if the user already exists by email
  const existingUser = await User.isUserExistsByCustomId(userData.email);
  if (existingUser) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Email is already registered',
    );
  }

  // Create the user
  const user = new User(userData);
  const createdUser = await user.save();

  return AuthServices.loginUser({
    email: createdUser.email,
    password: userData.password,
  });
};
const updateDetailsUserIntoDB = async (
  userId: string,
  _id: string,
  role: string,
  userData: IUserDetailsWithoutId,
) => {
  if (_id !== userId && role !== 'admin') {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'You are not authorized t');
  }

  // Update or create UserDetails
  const updatedDetails = await UserDetails.findOneAndUpdate(
    { user: userId },
    { $set: userData },
    { new: true, upsert: true },
  ).lean(); // return plain object

  // Update User name if needed
  let updatedUser = null;
  if (userData?.name) {
    updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name } },
      { new: true },
    )
      .select('name')
      .lean();
  } else {
    updatedUser = await User.findById(userId).select('name').lean();
  }
  return {
    name: updatedUser?.name,
    ...updatedDetails,
  };
};

export const UserServices = {
  createUserIntoDB,
  updateDetailsUserIntoDB,
};
