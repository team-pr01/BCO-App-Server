import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { ReelControllers } from "./reels.controller";

const router = express.Router();

// For admin only
router.post(
  "/add-reel",
  auth(UserRole.admin),

  ReelControllers.addReel,
);

router.get("/", ReelControllers.getAllReels);
router.get("/:reelId", ReelControllers.getSingleReelById);

router.patch(
  "/like/:reelId",
  auth(UserRole.admin, UserRole.user),
  ReelControllers.toggleLikeReels,
);

router.put(
  "/:reelId",
  auth(UserRole.admin),

  ReelControllers.updateReel,
);

router.delete(
  "/:reelId",
  auth(UserRole.admin),

  ReelControllers.deleteReel,
);

export const ReelsRoutes = router;
