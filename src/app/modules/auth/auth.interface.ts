export type TLoginAuth = {
  email: string;
  password: string;
};

import { Model } from "mongoose";
import { UserRole } from "./auth.constannts";

export type TUser = {
  _id : string;
  avatar?: string;
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  country: string;
  password: string;
  role: "user" | "admin";
  expoPushToken: string;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null; 
  isDeleted: boolean;
  isSuspended: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof UserRole;
