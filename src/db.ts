import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

export const connectToDB = () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then(() => console.log("MONGO DB CONNECTED!!!"));
  } catch (error) {}
};
