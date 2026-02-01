import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../auth/auth.constannts";
import { NewsControllers } from "./news.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/add-news",
  auth(UserRole.admin),

  multerUpload.single("file"),
  NewsControllers.addNews,
);

router.get("/", NewsControllers.getAllNews);
router.get("/:newsId", NewsControllers.getSingleNewsById);

router.put(
  "/:newsId",
  multerUpload.single("file"),
  auth(UserRole.admin),

  NewsControllers.updateNews,
);
router.delete(
  "/:newsId",
  auth(UserRole.admin),

  NewsControllers.deleteNews,
);
router.patch(
  "/like/:newsId",
  auth(UserRole.admin, UserRole.user),
  NewsControllers.toggleLikeNewsController,
);

router.patch(
  "/view/:newsId",
  auth(UserRole.admin, UserRole.user),
  NewsControllers.viewNews,
);

export const NewsRoutes = router;
