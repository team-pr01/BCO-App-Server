import { ObjectId } from "mongoose";

export type TContactUs = {
  userId ? : ObjectId
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
};
