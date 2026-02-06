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
exports.ContentService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const content_model_1 = __importDefault(require("./content.model"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const createContent = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = "";
    if (file) {
        const imageName = `Content-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, payload), { imageUrl });
    const result = yield content_model_1.default.create(payloadData);
    return result;
});
const getAllContents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield content_model_1.default.find();
});
const getSingleContent = (contentId) => __awaiter(void 0, void 0, void 0, function* () {
    const content = yield content_model_1.default.findById(contentId);
    if (!content) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Content not found");
    }
    return content;
});
const updateContent = (contentId, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield content_model_1.default.findById(contentId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultancy service not found");
    }
    let imageUrl;
    if (file) {
        const imageName = `Content-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const updatePayload = Object.assign(Object.assign({}, payload), (imageUrl && { imageUrl }));
    const result = yield content_model_1.default.findByIdAndUpdate(contentId, updatePayload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteContent = (contentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.default.findByIdAndDelete(contentId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Content not found");
    }
    return result;
});
exports.ContentService = {
    createContent,
    getAllContents,
    getSingleContent,
    updateContent,
    deleteContent,
};
