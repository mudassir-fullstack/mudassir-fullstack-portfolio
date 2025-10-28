import { NextResponse } from "next/server";
import ContactModel from "@/models/Contact";


export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, email, subject, message, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const contact = await ContactModel.create({
      name,
      email,
      subject,
      message,
      phone,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!", data: contact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error in Contact API:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while sending message",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
