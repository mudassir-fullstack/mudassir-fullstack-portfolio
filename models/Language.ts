// models/Language.ts
import mongoose, { Schema, Document, models } from "mongoose";
import { Language } from "@/types/language";

export interface ILanguage extends Omit<Language, "_id">, Document {}

const LanguageSchema = new Schema<ILanguage>(
  {
    name: { type: String, required: true },
    proficiency: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Fluent", "Native"],
    },
  },
  { timestamps: true }
);

const LanguageModel =
  models.Language || mongoose.model<ILanguage>("Language", LanguageSchema);

export default LanguageModel;
