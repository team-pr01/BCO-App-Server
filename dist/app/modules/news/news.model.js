"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NewsTranslationSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: String, required: true },
}, { _id: false });
const NewsSchema = new mongoose_1.Schema({
    imageUrl: { type: String, required: true },
    translations: {
        type: Map,
        of: NewsTranslationSchema,
        required: true,
    },
    likes: { type: Number, default: 0, required: false },
    likedBy: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0, required: false },
    viewedBy: [{ type: mongoose_1.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
const News = (0, mongoose_1.model)("News", NewsSchema);
exports.default = News;
