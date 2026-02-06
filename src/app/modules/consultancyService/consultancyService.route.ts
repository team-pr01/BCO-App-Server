import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ConsultancyServiceControllers } from "./consultancyService.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

// For admin only
router.post(
  "/add-consultancy-service",
  multerUpload.single("file"),
  auth(UserRole.admin),
  ConsultancyServiceControllers.addConsultancyService
);

router.get("/", ConsultancyServiceControllers.getAllConsultancyServices);
router.get("/:consultancyServiceId", ConsultancyServiceControllers.getSingleConsultancyServiceById);

router.put(
  "/:consultancyServiceId",
  multerUpload.single("file"),
  auth(UserRole.admin),
  ConsultancyServiceControllers.updateConsultancyService
);

router.delete("/:consultancyServiceId", auth(UserRole.admin), ConsultancyServiceControllers.deleteConsultancyService);

export const ConsultancyServiceRoutes = router;