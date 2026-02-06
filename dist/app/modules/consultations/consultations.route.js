"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const consultations_controller_1 = require("./consultations.controller");
const router = express_1.default.Router();
// Book a consultation (user)
router.post("/book", (0, auth_1.default)(auth_constannts_1.UserRole.user, auth_constannts_1.UserRole.admin), consultations_controller_1.ConsultationControllers.bookConsultation);
// Get all consultations (admin)
router.get("/", (0, auth_1.default)(auth_constannts_1.UserRole.admin), consultations_controller_1.ConsultationControllers.getAllConsultations);
// Get single consultation by ID
router.get("/:consultationId", (0, auth_1.default)(auth_constannts_1.UserRole.user, auth_constannts_1.UserRole.admin), consultations_controller_1.ConsultationControllers.getSingleConsultationById);
// Get my consultations (logged-in user)
router.get("/my-consultations", (0, auth_1.default)(auth_constannts_1.UserRole.user), consultations_controller_1.ConsultationControllers.getMyConsultations);
// Schedule consultation route
router.put("/schedule/:consultationId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), consultations_controller_1.ConsultationControllers.scheduleConsultation);
// Update consultation status (admin)
router.put("/update-status/:consultationId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), consultations_controller_1.ConsultationControllers.updateConsultationStatus);
// Delete consultation (admin)
router.delete("/delete/:consultationId", (0, auth_1.default)(auth_constannts_1.UserRole.user, auth_constannts_1.UserRole.admin), consultations_controller_1.ConsultationControllers.deleteConsultation);
exports.ConsultationRoutes = router;
