"use client";

import { useExperience } from "@/hooks/useExperience";
import { experience as ExperienceType } from "@/types/experience";

const ExperiencePage = () => {
  const { data, loading, error } = useExperience();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Experience</h1>

      {data.map((item: ExperienceType) => (
        <div key={item._id} className="p-4 border rounded-xl shadow-md bg-white">
          {item.companyLogo && (
            <img
              src={item.companyLogo}
              alt={item.companyName}
              className="w-24 h-24 object-cover mx-auto rounded-full mb-4"
            />
          )}
          <h2 className="text-xl font-semibold text-center">{item.position}</h2>
          <p className="text-gray-600 text-center">{item.companyName}</p>
          <p className="text-sm text-center mt-2">
            {item.startDate} → {item.isCurrent ? "Present" : item.endDate}
          </p>

          {item.description && (
            <p className="mt-3 text-gray-700 text-center">{item.description}</p>
          )}

          {item.technologies && (
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExperiencePage;
