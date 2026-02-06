"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BusinessListSchema = new mongoose_1.Schema({
    businessName: {
        type: String,
        required: true,
        trim: true,
    },
    businessType: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const BusinessList = (0, mongoose_1.model)("BusinessList", BusinessListSchema);
exports.default = BusinessList;
