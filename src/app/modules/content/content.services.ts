/* eslint-disable @typescript-eslint/no-explicit-any */
import Content from "./content.model";
import { TContent } from "./content.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";

const createContent = async (
  payload: TContent,
  file: Express.Multer.File | undefined
) => {
  let imageUrl = "";

  if (file) {
    const imageName = `Content-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const payloadData = {
    ...payload,
    imageUrl,
  };
  const result = await Content.create(payloadData);
  return result;
};

const getAllContents = async () => {
  return await Content.find();
};

const getSingleContent = async (contentId: string) => {
  const content = await Content.findById(contentId);
  if (!content) {
    throw new AppError(httpStatus.NOT_FOUND, "Content not found");
  }
  return content;
};

const updateContent = async (
  contentId: string,
  payload: Partial<TContent>,
  file: any
) => {
  const existing = await Content.findById(contentId);

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Consultancy service not found");
  }

  let imageUrl: string | undefined;

  if (file) {
    const imageName = `Content-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    imageUrl = secure_url;
  }

  const updatePayload: Partial<TContent> = {
    ...payload,
    ...(imageUrl && { imageUrl }),
  };

  const result = await Content.findByIdAndUpdate(contentId, updatePayload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteContent = async (contentId: string) => {
  const result = await Content.findByIdAndDelete(contentId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Content not found");
  }
  return result;
};

export const ContentService = {
  createContent,
  getAllContents,
  getSingleContent,
  updateContent,
  deleteContent,
};
