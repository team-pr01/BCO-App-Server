import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BusinessListServices } from "./businessList.services";

// Add business (Admin)
const addBusiness = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await BusinessListServices.addBusiness(req.body, file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Business added successfully",
    data: result,
  });
});

// Get all businesses
const getAllBusinesses = catchAsync(async (req, res) => {
  const { keyword } = req.query;

  const result = await BusinessListServices.getAllBusinesses(
    keyword as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Businesses fetched successfully.",
    data: result,
  });
});

// Get single business by id
const getSingleBusinessById = catchAsync(async (req, res) => {
  const { businessId } = req.params;

  const result =
    await BusinessListServices.getSingleBusinessById(businessId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Business fetched successfully.",
    data: result,
  });
});

// Update business
const updateBusiness = catchAsync(async (req, res) => {
  const { businessId } = req.params;

  const result = await BusinessListServices.updateBusiness(
    businessId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Business updated successfully",
    data: result,
  });
});

// Delete business
const deleteBusiness = catchAsync(async (req, res) => {
  const { businessId } = req.params;

  const result =
    await BusinessListServices.deleteBusiness(businessId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Business deleted successfully",
    data: result,
  });
});

export const BusinessListControllers = {
  addBusiness,
  getAllBusinesses,
  getSingleBusinessById,
  updateBusiness,
  deleteBusiness,
};
