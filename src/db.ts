import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const CulturalTicketSchema = new Schema({
  name: String,
  email: String,
  contact: String,
  participation: String,
});

const AudienceTicketSchema = new Schema({
  name: String,
  email: String,
  contact: String,
});

const CulturalTicket = model(
  "CulturalTicket",
  CulturalTicketSchema,
  "CULTURAL_TICKETS"
);

const AudienceTicket = model(
  "AudienceTicket",
  AudienceTicketSchema,
  "AUDIENCE_TICKETS"
);

const MONGO_URI = process.env.MONGO_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI!, {
      autoCreate: true,
      dbName: "gdg-techXtreme-ticket-register",
    });
    console.log("[DB] - Connected to MongoDB");
  } catch (error) {
    console.error("[DB] - Error connecting to MongoDB: ", error);
  }
};

export { connectDb, CulturalTicket, AudienceTicket };
