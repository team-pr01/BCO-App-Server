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
exports.BusinessListControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const businessList_services_1 = require("./businessList.services");
// Add business (Admin)
const addBusiness = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const result = yield businessList_services_1.BusinessListServices.addBusiness(req.body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Business added successfully",
        data: result,
    });
}));
// Get all businesses
const getAllBusinesses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    const result = yield businessList_services_1.BusinessListServices.getAllBusinesses(keyword);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Businesses fetched successfully.",
        data: result,
    });
}));
// Get single business by id
const getSingleBusinessById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessId } = req.params;
    const result = yield businessList_services_1.BusinessListServices.getSingleBusinessById(businessId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Business fetched successfully.",
        data: result,
    });
}));
// Update business
const updateBusiness = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessId } = req.params;
    const result = yield businessList_services_1.BusinessListServices.updateBusiness(businessId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Business updated successfully",
        data: result,
    });
}));
// Delete business
const deleteBusiness = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { businessId } = req.params;
    const result = yield businessList_services_1.BusinessListServices.deleteBusiness(businessId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Business deleted successfully",
        data: result,
    });
}));
exports.BusinessListControllers = {
    addBusiness,
    getAllBusinesses,
    getSingleBusinessById,
    updateBusiness,
    deleteBusiness,
};
