/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBusinessList } from "./businessList.interface";
import BusinessList from "./businessList.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { User } from "../auth/auth.model";

// Add business (admin/user)
const addBusiness = async (
  payload: TBusinessList & { createdBy: string },
  file: Express.Multer.File | undefined
) => {
  const {
    businessName,
    businessType,
    description,
    phoneNumber,
    email,
    website,
    location,
    createdBy,
  } = payload;

  const user = await User.findById(createdBy);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  let imageUrl = payload.imageUrl || "";

  if (file) {
    const imageName = `${businessName}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const businessData = {
    businessName,
    businessType,
    description,
    phoneNumber,
    email,
    website,
    location,
    imageUrl,
    createdBy,
  };

  const result = await BusinessList.create(businessData);
  return result;
};

// Get all businesses (with search)
const getAllBusinesses = async (keyword: string) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { businessName: { $regex: keyword, $options: "i" } },
      { businessType: { $regex: keyword, $options: "i" } },
      { location: { $regex: keyword, $options: "i" } },
    ];
  }

  const result = await BusinessList.find(query).sort({ createdAt: -1 });
  return result;
};

// Get single business by id
const getSingleBusinessById = async (businessId: string) => {
  const result = await BusinessList.findById(businessId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Business not found");
  }

  return result;
};

// Update business
const updateBusiness = async (
  businessId: string,
  payload: Partial<TBusinessList>
) => {
  const existingBusiness = await BusinessList.findById(businessId);

  if (!existingBusiness) {
    throw new AppError(httpStatus.NOT_FOUND, "Business not found");
  }

  const result = await BusinessList.findByIdAndUpdate(
    businessId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

// Delete business
const deleteBusiness = async (businessId: string) => {
  const result = await BusinessList.findByIdAndDelete(businessId);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Business not found");
  }

  return result;
};

export const BusinessListServices = {
  addBusiness,
  getAllBusinesses,
  getSingleBusinessById,
  updateBusiness,
  deleteBusiness,
};
