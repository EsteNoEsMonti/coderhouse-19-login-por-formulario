import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../config/database.config.js";

export async function connectDb() {
  await mongoose.connect(MONGODB_CNX_STR)
  console.log(`🌙 Data base connected to ${MONGODB_CNX_STR} 📚💻`);
}