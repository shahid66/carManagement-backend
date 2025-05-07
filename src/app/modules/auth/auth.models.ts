import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';
import config from '../../config';
import { UserModel } from './user.interface';

export type UserRole =
  | 'admin'
  | 'manager'
  | 'technician'
  | 'engineer'
  | 'helper'
  | 'customer';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [
        'admin',
        'manager',
        'technician',
        'engineer',
        'helper',
        'customer',
      ],
      default: 'customer',
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);
