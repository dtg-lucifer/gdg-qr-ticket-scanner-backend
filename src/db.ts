import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const TicketSchema = new Schema({
  name: String,
  studentId: String,
  email: String,
  ticketType: String,
});

const TicketModel = model("Ticket", TicketSchema, "GENERAL_TICKETS");

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

export { connectDb, TicketModel };
