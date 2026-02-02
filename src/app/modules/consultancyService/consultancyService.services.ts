/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TConsultancyService } from "./consultancyService.interface";
import ConsultancyService from "./consultancyService.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

// Add consultancy service (admin only)
const addConsultancyService = async (
  payload: TConsultancyService,
  file: Express.Multer.File | undefined
) => {
  let imageUrl = "";

  if (file) {
    const imageName = `${payload.name}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const payloadData = {
    ...payload,
    imageUrl,
  };

  const result = await ConsultancyService.create(payloadData);
  return result;
};

// Get all consultancy services
const getAllConsultancyServices = async (keyword:any, category:any) => {
  const query: any = {};

  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { specialty: { $regex: keyword, $options: "i" } },
    ];
  }

   if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  const result = await ConsultancyService.find(query);
  return result;
};

// Get single consultancy service by ID
const getSingleConsultancyServiceById = async (id: string) => {
  const result = await ConsultancyService.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultancy service not found");
  }
  return result;
};

// Update consultancy service
const updateConsultancyService = async (
  id: string,
  payload: Partial<TConsultancyService>,
  file: any
) => {
  const existing = await ConsultancyService.findById(id);

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultancy service not found");
  }

  let imageUrl: string | undefined;

  if (file) {
    const imageName = `${payload?.name || existing.name}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const updatePayload: Partial<TConsultancyService> = {
    ...payload,
    ...(imageUrl && { imageUrl }),
  };

  const result = await ConsultancyService.findByIdAndUpdate(id, updatePayload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Delete consultancy service by ID
const deleteConsultancyService = async (id: string) => {
  const result = await ConsultancyService.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultancy service not found");
  }
  return result;
};

export const ConsultancyServiceServices = {
  addConsultancyService,
  getAllConsultancyServices,
  getSingleConsultancyServiceById,
  updateConsultancyService,
  deleteConsultancyService,
};
