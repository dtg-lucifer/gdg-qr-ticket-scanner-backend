import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb, CulturalTicket, AudienceTicket } from "./db";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  // cors({
  //   credentials: true,
  //   origin: [
  //     "http://localhost:5173",
  //     "https://gdg-qr-ticket-scanner.vercel.app",
  //   ],
  // })
  cors({
    origin: [
      "http://localhost:5173",
      "https://gdg-qr-ticket-scanner.vercel.app",
    ],
    methods: ["GET", "POST", "OPTIONS"], // Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.post("/api/scan", async (req: Request, res: Response) => {
  const { name, email, contact, participation } = req.body;
  if (!name || !email) {
    res.status(400).json({
      error: "Some fields are missing",
    });
    return;
  }

  let scannedTicket;

  if (participation) {
    scannedTicket = new CulturalTicket({
      name,
      email,
      contact,
      participation,
    });
  } else {
    scannedTicket = new AudienceTicket({
      name,
      email,
      contact,
    });
  }

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

app.listen(8080, () =>
  console.log("[Server] - Server is listening on port 8080")
);
