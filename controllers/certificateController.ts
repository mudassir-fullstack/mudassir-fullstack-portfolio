import { NextResponse } from "next/server";
import CertificateModel from "@/models/Certificate";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// POST
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const organization = formData.get("organization") as string;
    const issueDate = formData.get("issueDate") as string;
    const description = formData.get("description") as string;
    const verifyLink = formData.get("verifyLink") as string;

    // ✅ Handle multiple image uploads
    const files = formData.getAll("certificateImages") as File[];
    const uploadedImages: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "certificates" },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      uploadedImages.push(uploadRes.secure_url);
    }

    // ✅ Save to MongoDB
    const newCertificate = await CertificateModel.create({
      title,
      organization,
      issueDate,
      certificateImages: uploadedImages,
      description,
      verifyLink,
    });

    return NextResponse.json({
      success: true,
      message: "Certificate added successfully",
      data: newCertificate,
    });
  } catch (error) {
    console.error("Error adding certificate:", error);
    return NextResponse.json(
      { success: false, message: "Server error while adding certificate", error: String(error) },
      { status: 500 }
    );
  }
}

// GET
export async function GET() {
  try {
    const certificates = await CertificateModel.find().sort({ issueDate: -1 });
    return NextResponse.json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch certificates", error: String(error) },
      { status: 500 }
    );
  }
}
