import express from "express";
import { AiControllers } from "./ai.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";

const router = express.Router();

router.post("/chat", auth( UserRole.user , UserRole.admin), AiControllers.aiChat);


export const AiRoutes = router;