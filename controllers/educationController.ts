import { NextResponse } from "next/server";
import EducationModel from "@/models/Education";
import cloudinary from "@/lib/cloudinary";

// GET
export const GET = async () => {
    try {
      const educationList = await EducationModel.find().sort({ startDate: -1 });
      return NextResponse.json({ success: true, data: educationList });
    } catch (error: any) {
      console.error("❌ Error fetching education:", error);
      return NextResponse.json(
        { success: false, message: "Failed to fetch education", error: error.message },
        { status: 500 }
      );
    }
  };

  //POST
export const POST = async (req: Request) => {
  try {
    const contentType = req.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const institution = formData.get("institution") as string;
      const degree = formData.get("degree") as string;
      const fieldOfStudy = formData.get("fieldOfStudy") as string | null;
      const startDate = formData.get("startDate") as string;
      const endDate = formData.get("endDate") as string | null;
      const isCurrent = formData.get("isCurrent") === "true";
      const grade = formData.get("grade") as string | null;
      const description = formData.get("description") as string | null;
      const logoFiles = formData.getAll("institutionLogos") as File[];
      const uploadedLogos: string[] = [];

      for (const logo of logoFiles) {
        if (logo && logo.size > 0) {
          const bytes = await logo.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const uploaded: any = await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ folder: "education/logos" }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
              })
              .end(buffer);
          });

          uploadedLogos.push(uploaded.secure_url);
        }
      }

      data = {
        institution,
        degree,
        fieldOfStudy: fieldOfStudy || undefined,
        startDate,
        endDate: endDate || undefined,
        isCurrent,
        grade: grade || undefined,
        description: description || undefined,
        institutionLogos: uploadedLogos,
      };
    } else {
      // 🧩 Handle JSON request (no files)
      data = await req.json();

      if (!data.institution || !data.degree || !data.startDate) {
        return NextResponse.json(
          {
            success: false,
            message: "Missing required fields: institution, degree, startDate",
          },
          { status: 400 }
        );
      }
    }

    // ✅ Save in MongoDB
    const education = await EducationModel.create(data);

    return NextResponse.json(
      {
        success: true,
        message: "Education added successfully",
        data: education,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error adding education:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while adding education",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

