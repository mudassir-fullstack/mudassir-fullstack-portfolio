import mongoose, { Mongoose } from "mongoose";

const DB_URI = process.env.DB_URI || "";

declare global {
  var mongooseConn: Mongoose | null | undefined;
}

export const connectDB = async (): Promise<Mongoose> => {
  if (global.mongooseConn) {
    return global.mongooseConn;
  }

  try {
    const conn = await mongoose.connect(DB_URI);
    global.mongooseConn = conn;
    console.log("✅ MongoDB Connected Successfully");
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("MongoDB connection failed");
  }
};

connectDB();
