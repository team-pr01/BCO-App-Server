import { Schema, model } from "mongoose";
import { TBusinessList } from "./businessList.interface";

const BusinessListSchema = new Schema<TBusinessList>(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    businessType: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BusinessList = model<TBusinessList>(
  "BusinessList",
  BusinessListSchema
);

export default BusinessList;