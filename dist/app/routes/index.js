"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const users_route_1 = require("../modules/users/users.route");
const content_route_1 = require("../modules/content/content.route");
const businessList_route_1 = require("../modules/businessList/businessList.route");
const news_route_1 = require("../modules/news/news.route");
const consultancyService_route_1 = require("../modules/consultancyService/consultancyService.route");
const reels_route_1 = require("../modules/reels/reels.route");
const contactUs_route_1 = require("../modules/contactUs/contactUs.route");
const consultations_route_1 = require("../modules/consultations/consultations.route");
const ai_route_1 = require("../modules/ai/ai.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoute,
    },
    {
        path: "/user",
        route: users_route_1.userRoutes,
    },
    {
        path: "/content",
        route: content_route_1.ContentRoutes,
    },
    {
        path: "/business-list",
        route: businessList_route_1.BusinessListRoutes,
    },
    {
        path: "/news",
        route: news_route_1.NewsRoutes,
    },
    {
        path: "/consultancy-service",
        route: consultancyService_route_1.ConsultancyServiceRoutes,
    },
    {
        path: "/consultation",
        route: consultations_route_1.ConsultationRoutes,
    },
    {
        path: "/reels",
        route: reels_route_1.ReelsRoutes,
    },
    {
        path: "/contact-us",
        route: contactUs_route_1.ContactUsRoutes,
    },
    {
        path: "/ai",
        route: ai_route_1.AiRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
