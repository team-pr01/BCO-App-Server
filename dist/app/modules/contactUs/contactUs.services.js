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
exports.ContactUsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const contactUs_model_1 = __importDefault(require("./contactUs.model"));
// Send contact message (Public)
const sendMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_model_1.default.create(payload);
    return result;
});
// Get all contact messages (Admin)
const getAllMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_model_1.default.find().sort({ createdAt: -1 });
    return result;
});
// Get single contact message by id (Admin)
const getSingleMessageById = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_model_1.default.findById(contactId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Contact message not found");
    }
    return result;
});
// Delete contact message (Admin)
const deleteMessage = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contactUs_model_1.default.findByIdAndDelete(contactId);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Contact message not found");
    }
    return result;
});
exports.ContactUsServices = {
    sendMessage,
    getAllMessages,
    getSingleMessageById,
    deleteMessage,
};
