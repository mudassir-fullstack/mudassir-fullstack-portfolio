import { NextResponse } from "next/server";
import About from "@/models/About";
import { About as AboutType } from "@/types/about";
import cloudinary from "@/lib/cloudinary";

//GET
export const GET = async () => {
  try {
    const about = await About.find();

    if (!about || about.length === 0) {
      return NextResponse.json(
        { success: false, message: "No about data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data fetched successfully", data: about },
      { status: 200 } 
    );
  } catch (error: any) {
    console.error("❌ Error fetching About data:", error);
    return NextResponse.json(
      { success: false, message: "Server error while fetching data" },
      { status: 500 } // ❌ Internal Server Error
    );
  }
};

//CREATE
export const POST = async (req: Request) => {
  try {
    let name,title, email, description, phone, address, linkedin, profilePicture;

    // 🧠 Detect if it's FormData or JSON
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // ✅ Handle FormData (for file uploads)
      const formData = await req.formData();
      title = formData.getAll("title") as string[];
      name = formData.get("name") as string;
      email = formData.get("email") as string;
      description = formData.get("description") as string;
      phone = formData.get("phone") as string;
      address = formData.get("address") as string;
      linkedin = formData.get("linkedin") as string;

      const file = formData.get("profilePicture") as File | null;
      if (file) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // ✅ Upload to Cloudinary
        const uploaded = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "portfolio/about" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });

        profilePicture = (uploaded as any).secure_url;
      }
    } else {
      // ✅ Handle normal JSON body
      const body = (await req.json()) as AboutType;
      ({ profilePicture, name, email, description, phone, address, linkedin, title } = body);
    }

    if (!name || !email || !description || !phone || !linkedin) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Create About document
    const newAbout = new About({
      profilePicture: profilePicture || "",
      title: title || [],
      name,
      email,
      description,
      phone,
      address,
      linkedin,
    });

    await newAbout.save();

    return NextResponse.json(
      { success: true, message: "About section created successfully", data: newAbout },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating About data:", error);
    return NextResponse.json(
      { success: false, message: "Server error while creating About data", error: error.message },
      { status: 500 }
    );
  }
};
