"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_constannts_1 = require("../auth/auth.constannts");
const multer_config_1 = require("../../config/multer.config");
const businessList_controller_1 = require("./businessList.controller");
const router = express_1.default.Router();
// Add business (admin or user)
router.post("/add", multer_config_1.multerUpload.single("file"), businessList_controller_1.BusinessListControllers.addBusiness);
// Get all businesses
router.get("/", businessList_controller_1.BusinessListControllers.getAllBusinesses);
// Get single business by id
router.get("/:businessId", businessList_controller_1.BusinessListControllers.getSingleBusinessById);
// Update business
router.put("/update/:businessId", businessList_controller_1.BusinessListControllers.updateBusiness);
// Delete business (admin only)
router.delete("/delete/:businessId", (0, auth_1.default)(auth_constannts_1.UserRole.admin), businessList_controller_1.BusinessListControllers.deleteBusiness);
exports.BusinessListRoutes = router;
