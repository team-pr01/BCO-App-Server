"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConsultationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userPhoneNumber: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: false,
    },
    consultantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ConsultancyService",
        required: true,
    },
    consultantName: {
        type: String,
        required: true,
    },
    consultantPhoneNumber: {
        type: String,
        required: true,
    },
    consultantEmail: {
        type: String,
        required: false,
    },
    concern: {
        type: String,
        required: false,
    },
    fees: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    scheduledAt: {
        type: Date,
        required: false,
    },
    meetingLink: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ["pending", "scheduled", "completed", "cancelled"],
        default: "pending",
    },
}, {
    timestamps: true,
});
const Consultation = (0, mongoose_1.model)("Consultation", ConsultationSchema);
exports.default = Consultation;
