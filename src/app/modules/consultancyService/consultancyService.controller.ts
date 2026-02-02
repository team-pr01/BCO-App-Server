import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ConsultancyServiceServices } from "./consultancyService.services";

// Add consultancy service (For admin)
const addConsultancyService = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await ConsultancyServiceServices.addConsultancyService(
    req.body,
    file
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultancy service added successfully",
    data: result,
  });
});

// Get all consultancy services
const getAllConsultancyServices = catchAsync(async (req, res) => {
  const { keyword, category } = req.query;
  const result = await ConsultancyServiceServices.getAllConsultancyServices(keyword, category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All consultancy services fetched successfully",
    data: result,
  });
});

// Get single consultancy service by ID
const getSingleConsultancyServiceById = catchAsync(async (req, res) => {
  const { consultancyServiceId } = req.params;
  const result = await ConsultancyServiceServices.getSingleConsultancyServiceById(
    consultancyServiceId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultancy service fetched successfully",
    data: result,
  });
});

// Update consultancy service
const updateConsultancyService = catchAsync(async (req, res) => {
  const file = req.file;
  const { consultancyServiceId } = req.params;
  const result = await ConsultancyServiceServices.updateConsultancyService(
    consultancyServiceId,
    req.body,
    file
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultancy service updated successfully",
    data: result,
  });
});

// Delete consultancy service
const deleteConsultancyService = catchAsync(async (req, res) => {
  const { consultancyServiceId } = req.params;
  const result = await ConsultancyServiceServices.deleteConsultancyService(
    consultancyServiceId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Consultancy service deleted successfully",
    data: result,
  });
});

export const ConsultancyServiceControllers = {
  addConsultancyService,
  getAllConsultancyServices,
  getSingleConsultancyServiceById,
  updateConsultancyService,
  deleteConsultancyService,
};
