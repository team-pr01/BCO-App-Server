"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReelsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const reels_controller_1 = require("./reels.controller");
const router = express_1.default.Router();
// For admin only
router.post("/add-reel", (0, auth_1.default)(auth_constannts_1.UserRole.admin), reels_controller_1.ReelControllers.addReel);
router.get("/", reels_controller_1.ReelControllers.getAllReels);
router.get("/:reelId", reels_controller_1.ReelControllers.getSingleReelById);
router.patch("/like/:reelId", (0, auth_1.default)(auth_constannts_1.UserRole.admin, auth_constannts_1.UserRole.user), reels_controller_1.ReelControllers.toggleLikeReels);
router.put("/:reelId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), reels_controller_1.ReelControllers.updateReel);
router.delete("/:reelId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), reels_controller_1.ReelControllers.deleteReel);
exports.ReelsRoutes = router;
