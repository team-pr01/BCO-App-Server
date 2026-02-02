import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReelServices } from "./reels.services";

// Add reel (For admin)
const addReel = catchAsync(async (req, res) => {
  const createdBy = req.user.userId;
  const result = await ReelServices.addReel(req.body, createdBy);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reel added successfully",
    data: result,
  });
});

// Get all reels
const getAllReels = catchAsync(async (req, res) => {
  const { keyword, category } = req.query;

  const result = await ReelServices.getAllReels(
    keyword as string,
    category as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reels fetched successfully.",
    data: result,
  });
});

// Get single reel by id
const getSingleReelById = catchAsync(async (req, res) => {
  const { reelId } = req.params;
  const result = await ReelServices.getSingleReelById(reelId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reel fetched successfully.",
    data: result,
  });
});

// Update reel
const updateReel = catchAsync(async (req, res) => {
  const { reelId } = req.params;
  const result = await ReelServices.updateReel(reelId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reel details updated successfully",
    data: result,
  });
});

const toggleLikeReels = catchAsync(async (req, res) => {
  const { reelId } = req.params;
  const userId = req.user.userId;

  const updatedReels = await ReelServices.toggleLikeReels(reelId, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reels like toggled successfully",
    data: {
      likes: updatedReels.likes,
      likedByUser: updatedReels.likedBy!.includes(userId),
    },
  });
});

// Delete emergency post by id
const deleteReel = catchAsync(async (req, res) => {
  const { reelId } = req.params;
  const result = await ReelServices.deleteReel(reelId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reel deleted successfully",
    data: result,
  });
});

export const ReelControllers = {
  addReel,
  getAllReels,
  getSingleReelById,
  updateReel,
  toggleLikeReels,
  deleteReel,
};
