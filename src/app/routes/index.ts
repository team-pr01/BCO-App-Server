import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/users/users.route";
import { ContentRoutes } from "../modules/content/content.route";
import { BusinessListRoutes } from "../modules/businessList/businessList.route";

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
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;