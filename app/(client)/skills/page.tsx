"use client";
import { useSkillsAndTools } from "@/hooks/useSkills";

const SkillsPage = () => {
  const { data: skills, loading, error } = useSkillsAndTools("skill");
  const { data: tools } = useSkillsAndTools("tool");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* 🧠 Skills Section */}
      <h1 className="text-3xl font-bold mb-4">My Skills</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="p-4 border rounded-lg shadow text-center hover:shadow-lg transition"
          >
            {skill.icon && (
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 mx-auto mb-2 object-contain"
              />
            )}
            <h2 className="font-semibold">{skill.name}</h2>
            {skill.level && (
              <p className="text-sm text-gray-500">{skill.level}</p>
            )}
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold my-6">Tools I Use</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <div
            key={tool._id}
            className="p-4 border rounded-lg shadow text-center hover:shadow-lg transition"
          >
            {tool.icon && (
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-12 h-12 mx-auto mb-2 object-contain"
              />
            )}
            <h2 className="font-semibold">{tool.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
