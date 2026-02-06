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
exports.ConsultationServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const consultations_model_1 = __importDefault(require("./consultations.model"));
const auth_model_1 = require("../auth/auth.model");
const consultancyService_model_1 = __importDefault(require("../consultancyService/consultancyService.model"));
// Book a consultation
const bookConsultation = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const consultantId = payload.consultantId;
    const userData = yield auth_model_1.User.findById(userId);
    const consultantData = yield consultancyService_model_1.default.findById(consultantId);
    const payloadData = Object.assign(Object.assign({}, payload), { userId, userName: userData === null || userData === void 0 ? void 0 : userData.name, userPhoneNumber: userData === null || userData === void 0 ? void 0 : userData.phoneNumber, userEmail: userData === null || userData === void 0 ? void 0 : userData.email, consultantName: consultantData === null || consultantData === void 0 ? void 0 : consultantData.name, consultantPhoneNumber: consultantData === null || consultantData === void 0 ? void 0 : consultantData.phoneNumber, consultantEmail: consultantData === null || consultantData === void 0 ? void 0 : consultantData.email, status: "pending" });
    const result = yield consultations_model_1.default.create(payloadData);
    return result;
});
// Get all consultations (admin)
const getAllConsultations = (keyword, status, category) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (keyword) {
        query.$or = [
            { userName: { $regex: keyword, $options: "i" } },
            { userEmail: { $regex: keyword, $options: "i" } },
            { userPhoneNumber: { $regex: keyword, $options: "i" } },
            { consultantName: { $regex: keyword, $options: "i" } },
            { consultantEmail: { $regex: keyword, $options: "i" } },
            { consultantPhoneNumber: { $regex: keyword, $options: "i" } },
            { concern: { $regex: keyword, $options: "i" } },
        ];
    }
    if (status) {
        query.status = status;
    }
    if (category) {
        query.category = category;
    }
    const result = yield consultations_model_1.default.find(query);
    return result;
});
// Get single consultation by id
const getSingleConsultationById = (consultationId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield consultations_model_1.default.findById(consultationId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultation not found");
    }
    return result;
});
// Get my consultations (logged-in user)
const getMyConsultations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield consultations_model_1.default.find({ user: userId });
    return result;
});
const scheduleConsultation = (consultationId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield consultations_model_1.default.findById(consultationId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultation not found");
    }
    existing.scheduledAt = new Date(payload === null || payload === void 0 ? void 0 : payload.scheduledAt);
    existing.meetingLink = payload === null || payload === void 0 ? void 0 : payload.meetingLink;
    existing.status = "scheduled";
    yield existing.save();
    // Populate user and consultant for consistency
    const result = yield consultations_model_1.default.findById(consultationId)
        .populate("userId", "name email phoneNumber")
        .populate("consultantId", "name email phoneNumber");
    return result;
});
// Update consultation status (admin)
const updateConsultationStatus = (consultationId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield consultations_model_1.default.findById(consultationId);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultation not found");
    }
    const result = yield consultations_model_1.default.findByIdAndUpdate(consultationId, { status }, { new: true, runValidators: true });
    return result;
});
// Delete consultation
const deleteConsultation = (consultationId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield consultations_model_1.default.findByIdAndDelete(consultationId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Consultation not found");
    }
    return result;
});
exports.ConsultationServices = {
    bookConsultation,
    getAllConsultations,
    getSingleConsultationById,
    getMyConsultations,
    scheduleConsultation,
    updateConsultationStatus,
    deleteConsultation,
};
