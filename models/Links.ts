// src/models/Links.ts
import mongoose, { Schema, Document, models } from "mongoose";
import { LinkType } from "@/types/links";

export interface ILink extends Omit<LinkType, "_id">, Document {}

const LinkSchema = new Schema<ILink>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String },
    description: { type: String },
    order: { type: Number },
  },
  { timestamps: true }
);

const LinkModel =
  models.Link || mongoose.model<ILink>("Link", LinkSchema);

export default LinkModel;
