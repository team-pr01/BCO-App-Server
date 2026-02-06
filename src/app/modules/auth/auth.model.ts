import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { TUser, UserModel } from "./auth.interface";
import { UserRole } from "./auth.constannts";

const userSchema = new Schema<TUser, UserModel>(
  {
    avatar: {
      type: String,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.user,
    },

    expoPushToken: {
      type: String,
      required: true,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isSuspended: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* ===========================
   Hooks
=========================== */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );

  next();
});

/* ===========================
   Statics
=========================== */

userSchema.statics.isUserExists = function (email: string) {
  return this.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

/* ===========================
   Model
=========================== */

export const User = model<TUser, UserModel>("User", userSchema);
