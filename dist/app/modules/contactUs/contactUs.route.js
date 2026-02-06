"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const contactUs_controller_1 = require("./contactUs.controller");
const router = express_1.default.Router();
// Public: Send contact message
router.post("/send-message", contactUs_controller_1.ContactUsControllers.sendMessage);
// Admin: Get all contact messages
router.get("/", (0, auth_1.default)(auth_constannts_1.UserRole.admin), contactUs_controller_1.ContactUsControllers.getAllMessages);
// Admin: Get single contact message by id
router.get("/:contactId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), contactUs_controller_1.ContactUsControllers.getSingleMessageById);
// Admin: Delete contact message
router.delete("/delete/:contactId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), contactUs_controller_1.ContactUsControllers.deleteMessage);
exports.ContactUsRoutes = router;
