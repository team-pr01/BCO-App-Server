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
exports.ConsultancyServiceServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const consultancyService_model_1 = __importDefault(require("./consultancyService.model"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
// Add consultancy service (admin only)
const addConsultancyService = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    let imageUrl = "";
    if (file) {
        const imageName = `${payload.name}-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, payload), { imageUrl });
    const result = yield consultancyService_model_1.default.create(payloadData);
    return result;
});
// Get all consultancy services
const getAllConsultancyServices = (keyword, category) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [
            { name: { $regex: keyword, $options: "i" } },
            { specialty: { $regex: keyword, $options: "i" } },
        ];
    }
    if (category) {
        query.category = { $regex: category, $options: "i" };
    }
    const result = yield consultancyService_model_1.default.find(query);
    return result;
});
// Get single consultancy service by ID
const getSingleConsultancyServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield consultancyService_model_1.default.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultancy service not found");
    }
    return result;
});
// Update consultancy service
const updateConsultancyService = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield consultancyService_model_1.default.findById(id);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultancy service not found");
    }
    let imageUrl;
    if (file) {
        const imageName = `${(payload === null || payload === void 0 ? void 0 : payload.name) || existing.name}-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const updatePayload = Object.assign(Object.assign({}, payload), (imageUrl && { imageUrl }));
    const result = yield consultancyService_model_1.default.findByIdAndUpdate(id, updatePayload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete consultancy service by ID
const deleteConsultancyService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield consultancyService_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultancy service not found");
    }
    return result;
});
exports.ConsultancyServiceServices = {
    addConsultancyService,
    getAllConsultancyServices,
    getSingleConsultancyServiceById,
    updateConsultancyService,
    deleteConsultancyService,
};
