"use client";

import Image from "next/image";
import { useCertificates } from "@/hooks/useCertificate";

const CertificatesPage = () => {
  const { data, loading, error } = useCertificates();

  if (loading) return <p className="text-center mt-10">Loading certificates...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Certificates</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No certificates available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((cert) => (
            <div
              key={cert._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{cert.title}</h2>
              <p className="text-gray-600 text-sm mb-1">
                <strong>Organization:</strong> {cert.organization}
              </p>
              <p className="text-gray-500 text-sm mb-3">
                <strong>Issued:</strong> {cert.issueDate}
              </p>

              {/* ✅ Multiple Certificate Images */}
              {cert.certificateImages && cert.certificateImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {cert.certificateImages.map((img, idx) => (
                    <div key={idx} className="relative w-full h-32">
                      <img
                        src={img}
                        alt={cert.title}
                        className="rounded-lg object-cover border"
                      />
                    </div>
                  ))}
                </div>
              )}

              {cert.description && (
                <p className="text-gray-700 text-sm mb-2">{cert.description}</p>
              )}

              {cert.verifyLink && (
                <a
                  href={cert.verifyLink}
                  target="_blank"
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  Verify Certificate →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
