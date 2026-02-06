"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContentSchema = new mongoose_1.Schema({
    videoUrl: {
        type: String,
        required: false,
        default: "",
    },
    imageUrl: {
        type: String,
        required: false,
        default: "",
    },
}, { timestamps: true });
const Content = (0, mongoose_1.model)("Content", ContentSchema);
exports.default = Content;
