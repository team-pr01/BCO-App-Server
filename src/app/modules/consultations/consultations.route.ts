import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ConsultationControllers } from "./consultations.controller";

const router = express.Router();

// Book a consultation (user)
router.post(
  "/book",
  auth(
    UserRole.user,
    UserRole.admin,
  ),
  ConsultationControllers.bookConsultation
);

// Get all consultations (admin)
router.get(
  "/",
  auth(UserRole.admin),
  ConsultationControllers.getAllConsultations
);

// Get single consultation by ID
router.get(
  "/:consultationId",
  auth(
    UserRole.user,
    UserRole.admin,
  ),
  ConsultationControllers.getSingleConsultationById
);

// Get my consultations (logged-in user)
router.get(
  "/my-consultations",
  auth(UserRole.user),
  ConsultationControllers.getMyConsultations
);

// Schedule consultation route
router.put(
  "/schedule/:consultationId",
  auth(UserRole.admin),
  ConsultationControllers.scheduleConsultation
);

// Update consultation status (admin)
router.put(
  "/update-status/:consultationId",
  auth(UserRole.admin),
  ConsultationControllers.updateConsultationStatus
);

// Delete consultation (admin)
router.delete(
  "/delete/:consultationId",
  auth(
    UserRole.user,
    UserRole.admin,
  ),
  ConsultationControllers.deleteConsultation
);

export const ConsultationRoutes = router;
