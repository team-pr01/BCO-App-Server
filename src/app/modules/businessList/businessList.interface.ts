import { ObjectId } from "mongoose";

export type TBusinessList = {
  businessName: string;
  businessType: string;
  description: string;
  phoneNumber: string;
  email?: string;
  website?: string;
  location: string;
  imageUrl: string;
  createdBy : ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
