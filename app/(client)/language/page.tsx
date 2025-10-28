"use client";

import { useLanguages } from "@/hooks/useLanguage";

const LanguagesPage = () => {
  const { data, loading, error } = useLanguages();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Languages</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((lang, index) => (
          <div
            key={lang._id || index}
            className="border p-4 rounded-lg shadow-md text-center bg-white hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{lang.name}</h3>
            <p className="text-gray-500">{lang.proficiency}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesPage;
