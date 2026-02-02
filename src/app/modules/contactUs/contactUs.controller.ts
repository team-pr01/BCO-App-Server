import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ContactUsServices } from "./contactUs.services";

// Send contact message (Public)
const sendMessage = catchAsync(async (req, res) => {
  const result = await ContactUsServices.sendMessage(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your message has been sent successfully. We will contact you soon.",
    data: result,
  });
});

// Get all contact messages (Admin)
const getAllMessages = catchAsync(async (req, res) => {
  const result = await ContactUsServices.getAllMessages();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact messages fetched successfully.",
    data: result,
  });
});

// Get single contact message by id (Admin)
const getSingleMessageById = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const result =
    await ContactUsServices.getSingleMessageById(contactId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact message fetched successfully.",
    data: result,
  });
});

// Delete contact message (Admin)
const deleteMessage = catchAsync(async (req, res) => {
  const { contactId } = req.params;

  const result =
    await ContactUsServices.deleteMessage(contactId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contact message deleted successfully.",
    data: result,
  });
});

export const ContactUsControllers = {
  sendMessage,
  getAllMessages,
  getSingleMessageById,
  deleteMessage,
};