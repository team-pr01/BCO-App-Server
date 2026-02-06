import { Schema, model } from "mongoose";
import { TConsultation } from "./consultations.interface";

const ConsultationSchema = new Schema<TConsultation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPhoneNumber: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: false,
    },

    consultantId: {
      type: Schema.Types.ObjectId,
      ref: "ConsultancyService",
      required: true,
    },
    consultantName: {
      type: String,
      required: true,
    },
    consultantPhoneNumber: {
      type: String,
      required: true,
    },
    consultantEmail: {
      type: String,
      required: false,
    },
    concern: {
      type: String,
      required: false,
    },
    fees: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: false,
    },
    meetingLink: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Consultation = model<TConsultation>("Consultation", ConsultationSchema);
export default Consultation;
