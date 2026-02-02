import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ConsultancyServiceControllers } from "./consultancyService.controller";
import authorizeRoute from "../../middlewares/authorizeRoute";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

// For admin only
router.post(
  "/add-consultancy-service",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ConsultancyServiceControllers.addConsultancyService
);

router.get("/", ConsultancyServiceControllers.getAllConsultancyServices);
router.get("/:consultancyServiceId", ConsultancyServiceControllers.getSingleConsultancyServiceById);

router.put(
  "/:consultancyServiceId",
  multerUpload.single("file"),
  auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]),
  authorizeRoute(),
  ConsultancyServiceControllers.updateConsultancyService
);

router.delete("/:consultancyServiceId", auth(UserRole.admin, UserRole.moderator, UserRole["super-admin"]), authorizeRoute(), ConsultancyServiceControllers.deleteConsultancyService);

export const ConsultancyServiceRoutes = router;
