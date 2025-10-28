// src/app/api/skills/route.ts
import { NextResponse } from "next/server";
import SkillModel from "@/models/Skills";
import cloudinary from "@/lib/cloudinary";
import { SkillType } from "@/types/skills";

export const dynamic = "force-dynamic";

// POST
export const POST = async (req: Request) => {
  try {
    const contentType = req.headers.get("content-type");

    let data: SkillType;

    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const name = formData.get("name") as string;
      const level = formData.get("level") as string | null;
      const category = formData.get("category") as "skill" | "tool";
      let icon = "";

      const file = formData.get("icon") as File | null;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploaded: any = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: `skills/${category}` }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });

        icon = uploaded.secure_url;
      }

      data = { name, level: level || undefined, category, icon };
    } else {
      data = await req.json();
    }

    const skill = await SkillModel.create(data);
    return NextResponse.json(
      { success: true, message: `${data.category} added successfully`, data: skill },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating skill/tool:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
   
    const items = await SkillModel.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, count: items.length, data: items },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error fetching data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch data", error: error.message },
      { status: 500 }
    );
  }
};
