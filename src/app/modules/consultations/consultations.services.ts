/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import Consultation from "./consultations.model";
import { TConsultation } from "./consultations.interface";
import { User } from "../auth/auth.model";
import ConsultancyService from "../consultancyService/consultancyService.model";

// Book a consultation
const bookConsultation = async (payload: TConsultation, userId: string) => {
  const consultantId = payload.consultantId;
  const userData = await User.findById(userId);
  const consultantData = await ConsultancyService.findById(consultantId);
  const payloadData = {
    ...payload,
    userId,
    userName: userData?.name,
    userPhoneNumber: userData?.phoneNumber,
    userEmail: userData?.email,
    consultantName: consultantData?.name,
    consultantPhoneNumber: consultantData?.phoneNumber,
    consultantEmail: consultantData?.email,
    status: "pending",
  };

  const result = await Consultation.create(payloadData);
  return result;
};

// Get all consultations (admin)
const getAllConsultations = async (
  keyword?: string,
  status?: string,
  category?: string
) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { userName: { $regex: keyword, $options: "i" } },
      { userEmail: { $regex: keyword, $options: "i" } },
      { userPhoneNumber: { $regex: keyword, $options: "i" } },
      { consultantName: { $regex: keyword, $options: "i" } },
      { consultantEmail: { $regex: keyword, $options: "i" } },
      { consultantPhoneNumber: { $regex: keyword, $options: "i" } },
      { concern: { $regex: keyword, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (category) {
    query.category = category;
  }

  const result = await Consultation.find(query);

  return result;
};

// Get single consultation by id
const getSingleConsultationById = async (consultationId: string) => {
  const result = await Consultation.findById(consultationId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultation not found");
  }
  return result;
};

// Get my consultations (logged-in user)
const getMyConsultations = async (userId: string) => {
  const result = await Consultation.find({ user: userId });
  return result;
};

const scheduleConsultation = async (consultationId: string, payload: any) => {
  const existing = await Consultation.findById(consultationId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultation not found");
  }

  existing.scheduledAt = new Date(payload?.scheduledAt);
  existing.meetingLink = payload?.meetingLink;
  existing.status = "scheduled";
  await existing.save();

  // Populate user and consultant for consistency
  const result = await Consultation.findById(consultationId)
    .populate("userId", "name email phoneNumber")
    .populate("consultantId", "name email phoneNumber");

  return result;
};

// Update consultation status (admin)
const updateConsultationStatus = async (
  consultationId: string,
  status: string
) => {
  const existing = await Consultation.findById(consultationId);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultation not found");
  }

  const result = await Consultation.findByIdAndUpdate(
    consultationId,
    { status },
    { new: true, runValidators: true }
  );

  return result;
};

// Delete consultation
const deleteConsultation = async (consultationId: string) => {
  const result = await Consultation.findByIdAndDelete(consultationId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultation not found");
  }
  return result;
};

export const ConsultationServices = {
  bookConsultation,
  getAllConsultations,
  getSingleConsultationById,
  getMyConsultations,
  scheduleConsultation,
  updateConsultationStatus,
  deleteConsultation,
};
