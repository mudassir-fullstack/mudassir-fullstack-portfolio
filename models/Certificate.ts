// src/models/Certificate.ts

import mongoose, { Schema, Document, models } from "mongoose";
import { CertificateType } from "@/types/certificate";

export interface ICertificate extends Omit<CertificateType, "_id">, Document {}

const CertificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    issueDate: { type: String, required: true },
    certificateImages: { type: [String], default: [] },
    description: { type: String },
    verifyLink: { type: String },
  },
  { timestamps: true }
);

const CertificateModel =
  models.Certificate ||
  mongoose.model<ICertificate>("Certificate", CertificateSchema);

export default CertificateModel;
