"use client";

import Image from "next/image";
import { useLinks } from "@/hooks/useLinks";

const LinksPage = () => {
  const { data, loading, error } = useLinks();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading links...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error}
      </div>
    );

  if (!data.length)
    return (
      <div className="text-gray-500 text-center mt-10">
        No links found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold mb-6">My Links</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((link) => (
          <div
            key={link._id}
            className="p-5 border rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            {link.icon && (
              <div className="w-16 h-16 mx-auto mb-4">
                <img
                  src={link.icon}
                  alt={link.platform}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              </div>
            )}
<p>{link.icon}</p>
            <h2 className="text-lg font-semibold text-center">{link.platform}</h2>
            <p className="text-sm text-gray-500 text-center mb-2">
              {link.description}
            </p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-2 text-blue-600 hover:underline"
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksPage;
