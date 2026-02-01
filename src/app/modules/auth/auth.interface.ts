export type TLoginAuth = {
  email: string;
  password: string;
};

import { Model } from "mongoose";
import { UserRole } from "./auth.constannts";

export type TUser = {
  _id: string;
  avatar?: string;
  name: string;
  email: string;
  phoneNumber: string;
  area?: string;
  city: string;
  state: string;
  country: string;
  password: string;
  role: "user" | "admin" | "moderator" | "super-admin" | "temple";
  assignedPages?: string[];
  totalQuizTaken?: number;
  isVerified: boolean;
  expoPushToken: string;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  isSuspended: boolean;
  lastLoggedIn?: Date;
  plan?: string;
  subscriptionStart?: Date;
  subscriptionEnd?: Date;
  // Usage tracking for subscription
  usage: {
    aiChatDaily: number;
    aiRecipesMonthly: number;
    vastuAiMonthly: number;
    kundliMonthly: number;
    muhurtaMonthly: number;

    lastDailyReset?: Date;
    lastMonthlyReset?: Date;
  };
};

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof UserRole;

// name,
// email,
// phoneNumber,
// dob,
// password,
// country,
// state,
// city,
// village/area (optional),
