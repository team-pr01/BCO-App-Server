"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ai_controller_1 = require("./ai.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const router = express_1.default.Router();
router.post("/chat", (0, auth_1.default)(auth_constannts_1.UserRole.user, auth_constannts_1.UserRole.admin), ai_controller_1.AiControllers.aiChat);
router.post("/translate-news", (0, auth_1.default)(auth_constannts_1.UserRole.user, auth_constannts_1.UserRole.admin), ai_controller_1.AiControllers.translateNews);
exports.AiRoutes = router;
