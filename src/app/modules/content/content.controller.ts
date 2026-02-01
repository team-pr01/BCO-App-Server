import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ContentService } from "./content.services";

const createContent = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const result = await ContentService.createContent(req.body, file);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Content created successfully",
    data: result,
  });
});

const getAllContents = catchAsync(async (req: Request, res: Response) => {
  const result = await ContentService.getAllContents();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Contents retrieved successfully",
    data: result,
  });
});

const getSingleContent = catchAsync(async (req: Request, res: Response) => {
  const result = await ContentService.getSingleContent(req.params.contentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Content retrieved successfully",
    data: result,
  });
});

const updateContent = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  const result = await ContentService.updateContent(
    req.params.contentId,
    req.body,
    file
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Content updated successfully",
    data: result,
  });
});

const deleteContent = catchAsync(async (req: Request, res: Response) => {
  const { contentId } = req.params;
  const result = await ContentService.deleteContent(contentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Content deleted successfully",
    data: result,
  });
});

export const ContentController = {
  createContent,
  getAllContents,
  getSingleContent,
  updateContent,
  deleteContent,
};
