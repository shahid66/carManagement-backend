/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { IUser } from "../auth/auth.models";


export interface UserModel extends Model<IUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(email: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export interface ILogin {
  email: string;
  password: string;
}
