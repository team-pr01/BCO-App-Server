import { Schema, model } from "mongoose";
import { TContactUs } from "./contactUs.interface";

const ContactUsSchema = new Schema<TContactUs>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUs = model<TContactUs>(
  "ContactUs",
  ContactUsSchema
);

export default ContactUs;