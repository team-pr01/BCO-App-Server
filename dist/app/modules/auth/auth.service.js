"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
// import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
const auth_model_1 = require("./auth.model");
const sendEmail_1 = require("../../utils/sendEmail");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures a 6-digit number
};
// Change user role (For admin)
const saveUserPushToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const user = yield auth_model_1.User.findById(payload === null || payload === void 0 ? void 0 : payload.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield auth_model_1.User.findByIdAndUpdate(payload.userId, { expoPushToken: payload.expoPushToken }, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Create user
const signup = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if user already exists
    const isUserExists = yield auth_model_1.User.findOne({ email: payload.email });
    if (isUserExists) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User already exists.");
    }
    let imageUrl = "";
    if (file) {
        const imageName = `${payload.name}-${Date.now()}`;
        const path = file.path;
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, path);
        imageUrl = secure_url;
    }
    const payloadData = Object.assign(Object.assign({}, payload), { avatar: imageUrl, role: payload.role || "user", isDeleted: false, isSuspended: false, isVerified: false });
    // Create user in the database
    const result = yield auth_model_1.User.create(payloadData);
    return result;
});
// Login
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists or not
    const user = yield auth_model_1.User.isUserExists(payload.email);
    if (!(yield user)) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
    }
    // Check if the user already deleted or not
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User does not exist.");
    }
    // Check if the user suspended or not
    if (user === null || user === void 0 ? void 0 : user.isSuspended) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are suspended!");
    }
    // Check if the password is correct or not
    if (!(yield auth_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password is not correct.");
    }
    yield auth_model_1.User.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, { lastLoggedIn: new Date() }, { new: true, runValidators: true });
    // Create token
    const jwtPayload = {
        userId: user._id.toString(),
        name: user.name,
        email: user.email || "",
        phoneNumber: user.phoneNumber,
        role: user.role,
        avatar: user.avatar || [],
    };
    const accessToken = (0, auth_utils_1.createToekn)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToekn)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            avatar: user.avatar || "",
        },
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if there is any token sent from the client or not.
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to proceed!");
    }
    // Check if the token is valid or not.
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email } = decoded;
    const user = yield auth_model_1.User.isUserExists(email);
    // Checking if the user exists or not
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    // Checking if the user is deleted or not
    // Have to check if the user is suspended or not
    const jwtPayload = {
        userId: user._id.toString(),
        name: user.name,
        email: user.email || "",
        phoneNumber: user.phoneNumber,
        role: user.role,
        avatar: user.avatar || [],
    };
    const accessToken = (0, auth_utils_1.createToekn)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found.");
    }
    const otp = generateOTP();
    yield auth_model_1.User.updateOne({ email }, {
        resetPasswordToken: otp,
        resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 min
    });
    const htmlBody = `
    <p>Hello <strong>${(user === null || user === void 0 ? void 0 : user.name) || "User"}</strong>,</p>
    <p>We received a request to reset your password.</p>
    <p>👉 <strong>Your reset OTP: ${otp}</strong></p>
    <p>Please follow these steps:</p>
    <ol>
      <li>Open the app.</li>
      <li>Go to the <strong>"Reset Password"</strong> screen.</li>
      <li>Paste the above OTP in the token input field.</li>
      <li>Enter your new password.</li>
      <li>Submit the form to complete the reset.</li>
    </ol>
    <p>If you didn’t request this, you can ignore this email.</p>
    <p>Thanks,<br/>Team BCO</p>
  `;
    yield (0, sendEmail_1.sendEmail)(user === null || user === void 0 ? void 0 : user.email, htmlBody);
    return {};
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, newPassword } = payload;
    const user = yield auth_model_1.User.findOne({ email });
    if (!user ||
        !user.resetPasswordToken ||
        !user.resetPasswordExpires ||
        user.resetPasswordToken !== otp ||
        new Date(user.resetPasswordExpires) < new Date()) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid or expired OTP.");
    }
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_round));
    // Use updateOne to update password and clear OTP fields
    yield auth_model_1.User.updateOne({ email }, {
        $set: {
            password: hashedPassword,
            passwordChangedAt: new Date(),
        },
        $unset: {
            resetPasswordToken: null,
            resetPasswordExpires: null,
        },
    });
    return {};
});
// Change user role (For admin)
const changeUserRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(payload === null || payload === void 0 ? void 0 : payload.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield auth_model_1.User.findByIdAndUpdate(payload === null || payload === void 0 ? void 0 : payload.userId, { role: payload === null || payload === void 0 ? void 0 : payload.role }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const assignPagesToUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(payload.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield auth_model_1.User.findByIdAndUpdate(payload.userId, { assignedPages: payload.pages }, { new: true, runValidators: true });
    return result;
});
exports.AuthServices = {
    saveUserPushToken,
    signup,
    loginUser,
    refreshToken,
    forgetPassword,
    resetPassword,
    changeUserRole,
    assignPagesToUser,
};
