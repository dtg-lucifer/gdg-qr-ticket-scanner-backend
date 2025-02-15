"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: [
        "http://localhost:5173",
        "https://gdg-qr-ticket-scanner.vercel.app",
    ],
}));
app.post("/api/scan", async (req, res) => {
    const { name, email, contact, participation } = req.body;
    if (!name || !email) {
        res.status(400).json({
            error: "Some fields are missing",
        });
        return;
    }
    let scannedTicket;
    if (participation) {
        scannedTicket = new db_1.CulturalTicket({
            name,
            email,
            contact: contact.toString(),
            participation,
        });
    }
    else {
        scannedTicket = new db_1.AudienceTicket({
            name,
            email,
            contact: contact.toString(),
        });
    }
    await scannedTicket.save();
    res.status(200).json({
        message: "Ticket scanned successfully",
    });
    return;
});
app.get("/health", (req, res) => {
    res.status(200).json({
        ping: "pong",
    });
    return;
});
(0, db_1.connectDb)();
app.listen(8080, () => console.log("[Server] - Server is listening on port 8080"));
