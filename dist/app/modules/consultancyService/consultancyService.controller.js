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
exports.ConsultancyServiceControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const consultancyService_services_1 = require("./consultancyService.services");
// Add consultancy service (For admin)
const addConsultancyService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const result = yield consultancyService_services_1.ConsultancyServiceServices.addConsultancyService(req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Consultancy service added successfully",
        data: result,
    });
}));
// Get all consultancy services
const getAllConsultancyServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword, category } = req.query;
    const result = yield consultancyService_services_1.ConsultancyServiceServices.getAllConsultancyServices(keyword, category);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All consultancy services fetched successfully",
        data: result,
    });
}));
// Get single consultancy service by ID
const getSingleConsultancyServiceById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { consultancyServiceId } = req.params;
    const result = yield consultancyService_services_1.ConsultancyServiceServices.getSingleConsultancyServiceById(consultancyServiceId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Consultancy service fetched successfully",
        data: result,
    });
}));
// Update consultancy service
const updateConsultancyService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const { consultancyServiceId } = req.params;
    const result = yield consultancyService_services_1.ConsultancyServiceServices.updateConsultancyService(consultancyServiceId, req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Consultancy service updated successfully",
        data: result,
    });
}));
// Delete consultancy service
const deleteConsultancyService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { consultancyServiceId } = req.params;
    const result = yield consultancyService_services_1.ConsultancyServiceServices.deleteConsultancyService(consultancyServiceId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Consultancy service deleted successfully",
        data: result,
    });
}));
exports.ConsultancyServiceControllers = {
    addConsultancyService,
    getAllConsultancyServices,
    getSingleConsultancyServiceById,
    updateConsultancyService,
    deleteConsultancyService,
};
