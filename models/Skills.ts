// src/models/Skill.ts
import mongoose, { Schema, Document, models } from "mongoose";
import { SkillType } from "@/types/skills";

export interface ISkill extends Omit<SkillType, "_id">, Document {}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    level: { type: String },
    icon: { type: String },
    category: { type: String, enum: ["skill", "tool"], required: true },
  },
  { timestamps: true }
);

const SkillModel = models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
export default SkillModel;
