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
exports.io = void 0;
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.db_url);
            server = http_1.default.createServer(app_1.default);
            exports.io = new socket_io_1.Server(server, {
                cors: {
                    origin: [
                        "http://localhost:5173",
                        "http://localhost:5000",
                        "http://api.brighttuitioncare.com",
                        "https://api.brighttuitioncare.com",
                    ],
                    methods: ["GET", "POST", "PUT", "DELETE"],
                    allowedHeaders: ["Content-Type", "Authorization"],
                    credentials: true,
                },
                pingInterval: 25000,
                pingTimeout: 60000,
                transports: ["websocket", "polling"],
            });
            // 🔐 Socket authentication + room join
            exports.io.on("connection", (socket) => {
                const { userId } = socket.handshake.auth;
                // console.log("🔌 Socket connected:", socket.id);
                // console.log("👤 userId:", userId);
                if (!userId) {
                    console.warn("❌ No userId, disconnecting");
                    socket.disconnect(true);
                    return;
                }
                socket.join(userId.toString());
                console.log(`✅ User ${userId} joined room ${userId}`);
                socket.on("disconnect", (reason) => {
                    console.log(`❌ Socket ${socket.id} disconnected:`, reason);
                });
            });
            server.listen(config_1.default.port, () => {
                console.log(`🚀 Server running on port ${config_1.default.port}`);
                console.log(`📡 Socket.IO listening on ws://localhost:${config_1.default.port}`);
            });
            exports.io.engine.on("connection_error", (err) => {
                console.error("🚫 Engine connection error:", err);
            });
        }
        catch (err) {
            console.error("🔥 Server startup error:", err);
            process.exit(1);
        }
    });
}
main();
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
