import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { ContentRoutes } from "../modules/content/content.route";
import { BusinessListRoutes } from "../modules/businessList/businessList.route";
import { NewsRoutes } from "../modules/news/news.route";
import { ConsultancyServiceRoutes } from "../modules/consultancyService/consultancyService.route";
import { ReelsRoutes } from "../modules/reels/reels.route";
import { ContactUsRoutes } from "../modules/contactUs/contactUs.route";
import { ConsultationRoutes } from "../modules/consultations/consultations.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoute,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/content",
    route: ContentRoutes,
  },
  {
    path: "/business-list",
    route: BusinessListRoutes,
  },
  {
    path: "/news",
    route: NewsRoutes,
  },
  {
    path: "/consultancy-service",
    route: ConsultancyServiceRoutes,
  },
  {
    path: "/consultation",
    route: ConsultationRoutes,
  },
  {
    path: "/reels",
    route: ReelsRoutes,
  },
  {
    path: "/contact-us",
    route: ContactUsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
