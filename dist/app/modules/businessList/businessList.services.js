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
exports.BusinessListServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const businessList_model_1 = __importDefault(require("./businessList.model"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const auth_model_1 = require("../auth/auth.model");
// Add business (admin/user)
const addBusiness = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessName, businessType, description, phoneNumber, email, website, location, createdBy, } = payload;
    const user = yield auth_model_1.User.findById(createdBy);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    let imageUrl = payload.imageUrl || "";
    if (file) {
        const imageName = `${businessName}-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
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
    const result = yield businessList_model_1.default.create(businessData);
    return result;
});
// Get all businesses (with search)
const getAllBusinesses = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [
            { businessName: { $regex: keyword, $options: "i" } },
            { businessType: { $regex: keyword, $options: "i" } },
            { location: { $regex: keyword, $options: "i" } },
        ];
    }
    const result = yield businessList_model_1.default.find(query).sort({ createdAt: -1 });
    return result;
});
// Get single business by id
const getSingleBusinessById = (businessId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield businessList_model_1.default.findById(businessId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Business not found");
    }
    return result;
});
// Update business
const updateBusiness = (businessId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBusiness = yield businessList_model_1.default.findById(businessId);
    if (!existingBusiness) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Business not found");
    }
    const result = yield businessList_model_1.default.findByIdAndUpdate(businessId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete business
const deleteBusiness = (businessId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield businessList_model_1.default.findByIdAndDelete(businessId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Business not found");
    }
    return result;
});
exports.BusinessListServices = {
    addBusiness,
    getAllBusinesses,
    getSingleBusinessById,
    updateBusiness,
    deleteBusiness,
};
