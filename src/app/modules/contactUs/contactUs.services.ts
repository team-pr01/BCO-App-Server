import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TContactUs } from "./contactUs.interface";
import ContactUs from "./contactUs.model";

// Send contact message (Public)
const sendMessage = async (payload: TContactUs) => {
  const result = await ContactUs.create(payload);
  return result;
};

// Get all contact messages (Admin)
const getAllMessages = async () => {
  const result = await ContactUs.find().sort({ createdAt: -1 });
  return result;
};

// Get single contact message by id (Admin)
const getSingleMessageById = async (contactId: string) => {
  const result = await ContactUs.findById(contactId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact message not found");
  }

  return result;
};

// Delete contact message (Admin)
const deleteMessage = async (contactId: string) => {
  const result = await ContactUs.findByIdAndDelete(contactId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Contact message not found");
  }

  return result;
};

export const ContactUsServices = {
  sendMessage,
  getAllMessages,
  getSingleMessageById,
  deleteMessage,
};
