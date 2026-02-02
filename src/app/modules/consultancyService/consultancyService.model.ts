import { Schema, model } from "mongoose";
import { TConsultancyService } from "./consultancyService.interface";

const ConsultancyServiceSchema = new Schema<TConsultancyService>(
  {
    imageUrl: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    availableTime: {
      type: String,
      required: true,
    },
    availabilityType: {
      type: [String],
      required: true,
    },
    fees: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConsultancyService = model<TConsultancyService>(
  "ConsultancyService",
  ConsultancyServiceSchema
);

export default ConsultancyService;
