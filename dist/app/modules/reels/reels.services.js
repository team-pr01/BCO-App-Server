"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReelServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const reels_model_1 = __importDefault(require("./reels.model"));
// Add reel for admin only
const addReel = (payload, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, videoUrl, videoSource, category, tags } = payload;
    const payloadData = {
        title,
        description,
        videoUrl,
        videoSource,
        category,
        tags,
        createdBy,
    };
    const result = yield reels_model_1.default.create(payloadData);
    return result;
});
// Get all reels
const getAllReels = (keyword, category) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (keyword) {
        filter.$or = [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ];
    }
    if (category) {
        filter.category = category;
    }
    const result = yield reels_model_1.default.find(filter);
    return result;
});
// Get single reel post by id
const getSingleReelById = (reelId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reels_model_1.default.findById(reelId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Reel not found");
    }
    return result;
});
// Update reel
const updateReel = (reelId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPost = yield reels_model_1.default.findById(reelId);
    if (!existingPost) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Reel not found");
    }
    const result = yield reels_model_1.default.findByIdAndUpdate(reelId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const toggleLikeReels = (reelId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reel = yield reels_model_1.default.findById(reelId);
    if (!reel)
        throw new Error("Reel not found");
    const likedIndex = reel.likedBy.findIndex((id) => id.toString() === userId);
    if (likedIndex >= 0) {
        // User already liked -> unlike
        reel.likedBy.splice(likedIndex, 1);
        reel.likes = Math.max(0, reel.likes - 1);
    }
    else {
        // User not liked -> like
        reel.likedBy.push(userId);
        reel.likes += 1;
    }
    yield reel.save();
    return reel;
});
// Delete reel by id
const deleteReel = (reelId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reels_model_1.default.findByIdAndDelete(reelId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Reel not found");
    }
    return result;
});
exports.ReelServices = {
    addReel,
    getAllReels,
    getSingleReelById,
    updateReel,
    toggleLikeReels,
    deleteReel,
};
