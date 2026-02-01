import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { multerUpload } from "../../config/multer.config";
import { BusinessListControllers } from "./businessList.controller";

const router = express.Router();

// Add business (admin or user)
router.post(
  "/add",
  multerUpload.single("file"),
  BusinessListControllers.addBusiness
);

// Get all businesses
router.get(
  "/",
  BusinessListControllers.getAllBusinesses
);

// Get single business by id
router.get(
  "/:businessId",
  BusinessListControllers.getSingleBusinessById
);

// Update business
router.put(
  "/update/:businessId",
  BusinessListControllers.updateBusiness
);

// Delete business (admin only)
router.delete(
  "/delete/:businessId",
  auth(UserRole.admin),
  BusinessListControllers.deleteBusiness
);

export const BusinessListRoutes = router;