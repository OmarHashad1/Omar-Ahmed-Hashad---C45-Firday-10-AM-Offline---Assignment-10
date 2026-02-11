import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const DBConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.URI);
  } catch (err) {
    throw new Error(`Database connection field: ${err}`);
  }
};
