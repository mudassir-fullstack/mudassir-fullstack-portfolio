import { NextResponse } from "next/server";
import ExperienceModel from "@/models/Experience";
import cloudinary from "@/lib/cloudinary";
import { experience as ExperienceType } from "@/types/experience";

//GET
export const GET = async () => {
  try {
    const experiences = await ExperienceModel.find();

    if (!experiences || experiences.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No experience data found",
          data: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Experience data fetched successfully",
        data: experiences,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error fetching experience data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while fetching experience data",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

//POST
export const POST = async (req: Request) => {
  try {
    const contentType = req.headers.get("content-type");
    let data: ExperienceType;

    if (contentType && contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      // Extract basic text fields
      const companyName = formData.get("companyName") as string;
      const position = formData.get("position") as string;
      const employmentType = formData.get("employmentType") as string | null;
      const location = formData.get("location") as string | null;
      const startDate = formData.get("startDate") as string;
      const endDate = formData.get("endDate") as string | null;
      const isCurrent = formData.get("isCurrent") === "true";
      const description = formData.get("description") as string | null;

      // Arrays (technologies and projects)
      const technologies = formData.getAll("technologies") as string[];
      const projectsJSON = formData.get("projects") as string;
      const projects = projectsJSON ? JSON.parse(projectsJSON) : [];

      // --- Upload company logo to Cloudinary (if file present)
      let companyLogo = "";
      const logoFile = formData.get("companyLogo") as File | null;
      if (logoFile && logoFile.size > 0) {
        const bytes = await logoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadedLogo: any = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "experience/company_logos" }, (err, result) => {
              if (err) reject(err);
              else resolve(result);
            })
            .end(buffer);
        });

        companyLogo = uploadedLogo.secure_url;
      }

      // --- Upload project images (if any)
      const uploadedProjects = await Promise.all(
        projects.map(async (project: any) => {
          if (project.projectImage && typeof project.projectImage === "object") {
            const file = project.projectImage as File;
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploaded: any = await new Promise((resolve, reject) => {
              cloudinary.uploader
                .upload_stream({ folder: "experience/project_images" }, (err, result) => {
                  if (err) reject(err);
                  else resolve(result);
                })
                .end(buffer);
            });

            project.projectImage = uploaded.secure_url;
          }
          return project;
        })
      );

      data = {
        companyName,
        position,
        employmentType: employmentType || undefined,
        location: location || undefined,
        startDate,
        endDate: endDate || undefined,
        isCurrent,
        description: description || undefined,
        technologies,
        companyLogo,
        projects: uploadedProjects,
      };
    }

    // --- 🧩 Case 2: JSON body (no file upload)
    else {
      data = await req.json();

      if (!data.companyName || !data.position || !data.startDate) {
        return NextResponse.json(
          {
            success: false,
            message: "Missing required fields: companyName, position, startDate",
          },
          { status: 400 }
        );
      }
    }

    // --- 🧱 Save to MongoDB
    const experience = await ExperienceModel.create(data);

    return NextResponse.json(
      {
        success: true,
        message: "Experience created successfully",
        data: experience,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating experience:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error while creating experience",
        error: error.message,
      },
      { status: 500 }
    );
  }
};


