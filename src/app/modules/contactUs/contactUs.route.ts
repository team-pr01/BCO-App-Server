import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ContactUsControllers } from "./contactUs.controller";

const router = express.Router();

// Public: Send contact message
router.post("/send-message", ContactUsControllers.sendMessage);

// Admin: Get all contact messages
router.get("/", auth(UserRole.admin), ContactUsControllers.getAllMessages);

// Admin: Get single contact message by id
router.get(
  "/:contactId",
  auth(UserRole.admin),
  ContactUsControllers.getSingleMessageById,
);

// Admin: Delete contact message
router.delete(
  "/delete/:contactId",
  auth(UserRole.admin),
  ContactUsControllers.deleteMessage,
);

export const ContactUsRoutes = router;
