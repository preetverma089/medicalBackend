import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";
configDotenv();

const mongoUri = process.env.Mongo_URI;
export async function dbConnect() {
  await mongoose.connect(mongoUri);
}
