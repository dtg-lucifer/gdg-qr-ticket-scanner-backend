import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb, TicketModel } from "./db";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://gdg-qr-ticket-scanner.vercel.app",
    ],
  })
);

app.post("/api/scan", async (req: Request, res: Response) => {
  const { name, studentId, email, ticketType } = req.body;
  if (!name || !studentId || !email || !ticketType) {
    res.status(400).json({
      error: "Some fields are missing",
    });
    return;
  }

  const scannedTicket = new TicketModel({
    name,
    studentId,
    email,
    ticketType,
  });

  await scannedTicket.save();

  res.status(200).json({
    message: "Ticket scanned successfully",
  });

  return;
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    ping: "pong",
  });
  return;
});

connectDb();

app.listen(8080, () => console.log("Server is listening on port 8080"));
