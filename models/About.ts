import mongoose, { Document, Schema } from "mongoose";
import { About as AboutType } from "@/types/about";

export interface IAbout extends Omit<AboutType, "_id">, Document {}
const aboutSchema = new Schema<IAbout>(
  {
    profilePicture: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    linkedin: { type: String, required: true },
  },
  { timestamps: true }
);

// Avoid model overwrite in dev (Next.js hot reload)
const About =
  mongoose.models.About || mongoose.model<IAbout>("About", aboutSchema);

export default About;
