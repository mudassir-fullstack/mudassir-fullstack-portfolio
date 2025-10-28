import mongoose, { Schema, Document, models } from "mongoose";
import { ContactType } from "@/types/contact";

export interface IContact extends Omit<ContactType, "_id">, Document {}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    phone: { type: String },
  },
  { timestamps: true }
);

const ContactModel =
  models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default ContactModel;
