// src/app/(client)/education/page.tsx
"use client";

import Image from "next/image";
import { useEducation } from "@/hooks/useEducation";

const EducationPage = () => {
  const { data, loading, error } = useEducation();

  if (loading) return <p className="text-center mt-10">Loading education...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">🎓 Education</h1>

      <div className="grid gap-6">
        {data.map((edu) => (
          <div
            key={edu._id}
            className="p-6 border rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{edu.degree}</h2>
            <p className="text-gray-700">{edu.institution}</p>
            {edu.fieldOfStudy && (
              <p className="text-gray-600">{edu.fieldOfStudy}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {edu.startDate} → {edu.isCurrent ? "Present" : edu.endDate}
            </p>

            {edu.grade && (
              <p className="text-sm text-gray-500">Grade: {edu.grade}</p>
            )}

            {edu.description && (
              <p className="mt-3 text-gray-700">{edu.description}</p>
            )}

            {/* ✅ Multiple logos display */}
            {edu.institutionLogos && edu.institutionLogos.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {edu.institutionLogos.map((logoUrl, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 border rounded-lg overflow-hidden"
                  >
                    <img
                      src={logoUrl}
                      alt={`Logo ${index + 1}`}
                    
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPage;
