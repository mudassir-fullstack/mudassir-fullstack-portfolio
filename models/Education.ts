import mongoose, { Schema, Document, models } from "mongoose";
import { EducationType } from "@/types/education";

export interface IEducation extends Omit<EducationType, "_id">, Document {}

const EducationSchema = new Schema<IEducation>(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    isCurrent: { type: Boolean, default: false },
    grade: { type: String },
    description: { type: String },
    institutionLogos: { type: [String], default: [] },
  },
  { timestamps: true }
);

const EducationModel =
  models.Education || mongoose.model<IEducation>("Education", EducationSchema);

export default EducationModel;
