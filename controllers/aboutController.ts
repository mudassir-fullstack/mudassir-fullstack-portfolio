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
    let name, email, description, phone, address, linkedin, profilePicture;

    // 🧠 Detect if it's FormData or JSON
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // ✅ Handle FormData (for file uploads)
      const formData = await req.formData();
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
      ({ profilePicture, name, email, description, phone, address, linkedin } = body);
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

//DELETE
export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID parameter is required" },
        { status: 400 }
      );
    }

    // ✅ Try deleting the record
    const deleted = await About.findByIdAndDelete(id);

    // ✅ If no document found with that ID
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "No About record found with this ID" },
        { status: 404 } // ❌ Not Found
      );
    }

    return NextResponse.json(
      { success: true, message: "About record deleted successfully" },
      { status: 200 } // ✅ OK
    );
  } catch (error: any) {
    console.error("❌ Error deleting About record:", error);
    return NextResponse.json(
      { success: false, message: "Server error while deleting record" },
      { status: 500 } // ❌ Internal Server Error
    );
  }
};

// PATCH
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    // ✅ Parse the incoming JSON data
    const body = await req.json();
    const {
      profilePicture,
      name,
      email,
      description,
      phone,
      address,
      linkedin,
    } = body;

    // ✅ Find the document by ID
    const existingAbout = await About.findById(id);
    if (!existingAbout) {
      return NextResponse.json(
        { success: false, message: "No About record found with this ID" },
        { status: 404 } // ❌ Not Found
      );
    }

    let uploadedImageUrl = existingAbout.profilePicture;

    // ✅ If a new image is provided, upload to Cloudinary
    if (profilePicture && profilePicture.startsWith("data:")) {
      const uploadedResponse = await cloudinary.uploader.upload(profilePicture, {
        folder: "portfolio/about",
      });
      uploadedImageUrl = uploadedResponse.secure_url;
    }

    // ✅ Only update fields provided in request (partial update)
    if (name !== undefined) existingAbout.name = name;
    if (email !== undefined) existingAbout.email = email;
    if (description !== undefined) existingAbout.description = description;
    if (phone !== undefined) existingAbout.phone = phone;
    if (address !== undefined) existingAbout.address = address;
    if (linkedin !== undefined) existingAbout.linkedin = linkedin;
    if (uploadedImageUrl !== existingAbout.profilePicture)
      existingAbout.profilePicture = uploadedImageUrl;

    // ✅ Save updated document
    await existingAbout.save();

    // ✅ Send success response
    return NextResponse.json(
      {
        success: true,
        message: "About record updated successfully (partial update)",
        data: existingAbout,
      },
      { status: 200 } // ✅ OK
    );
  } catch (error: any) {
    console.error("❌ Error updating About record:", error);
    return NextResponse.json(
      { success: false, message: "Server error while updating record" },
      { status: 500 } // ❌ Internal Server Error
    );
  }
};
