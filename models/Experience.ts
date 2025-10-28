import mongoose, { Document, Schema } from "mongoose";
import { experience } from "@/types/experience";

// Combine your custom type with Mongoose Document
export interface IExperience extends Omit <experience, "_id"> , Document {}

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    projectImage: { type: String },
  },
  { _id: false } // prevents auto _id for each project
);

const experienceSchema = new Schema<IExperience>(
  {
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    employmentType: { type: String },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    isCurrent: { type: Boolean, default: false },
    description: { type: String },
    technologies: [{ type: String }],
    companyLogo: { type: String },
    projects: [projectSchema],
  },
  { timestamps: true }
);

const ExperienceModel =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", experienceSchema);

export default ExperienceModel;
