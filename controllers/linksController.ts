import { NextResponse } from "next/server";
import LinkModel from "@/models/Links";
import cloudinary from "@/lib/cloudinary";


//GET
export async function GET() {
  try {
    const links = await LinkModel.find();
    return NextResponse.json({ success: true, data: links });
  } catch (error: any) {
    console.error("❌ Error fetching links:", error);
    return NextResponse.json(
      { success: false, message: "Server error while fetching links", error: error.message },
      { status: 500 }
    );
  }
}


//POST
export const POST=async(req: Request)=> {
    try {
      const contentType = req.headers.get("content-type");
      if (!contentType?.includes("multipart/form-data")) {
        return NextResponse.json(
          { success: false, message: "Invalid content type, expected form-data" },
          { status: 400 }
        );
      }
  
      const formData = await req.formData();
      const platform = formData.get("platform") as string;
      const url = formData.get("url") as string;
      const description = formData.get("description") as string | null;
      const order = Number(formData.get("order")) || 0;
  
      let icon = "";
      const iconFile = formData.get("icon") as File | null;
  
      if (iconFile && iconFile.size > 0) {
        const bytes = await iconFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
  
        const uploadedIcon: any = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "links/icons" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });
  
        icon = uploadedIcon.secure_url;
      }
  
      const newLink = await LinkModel.create({
        platform,
        url,
        description,
        order,
        icon,
      });
  
      return NextResponse.json(
        { success: true, message: "Link created successfully", data: newLink },
        { status: 201 }
      );
    } catch (error: any) {
      console.error("❌ Error creating link:", error);
      return NextResponse.json(
        { success: false, message: "Server error while creating link", error: error.message },
        { status: 500 }
      );
    }
  }
  