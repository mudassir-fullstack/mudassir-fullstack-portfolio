"use client";
import { useAbout } from "@/hooks/useAbout";
import { About as AboutType } from '@/types/about'

const AboutPage=()=>{
  const { data, loading, error } = useAbout();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="grid gap-6 p-6">
      {data && data.map((item:AboutType) => (
        <div key={item._id} className="p-4 border rounded-xl shadow-md">
          {item.profilePicture && (
            <img
              src={item.profilePicture}
              alt={item.name}
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          )}
          <h2 className="text-xl font-bold text-center mt-2">{item.name}</h2>
          <p className="text-center text-gray-600">{item.email}</p>
          <p className="text-gray-700 text-center">{item.description}</p>
        </div>
      ))}
    </section>
  );
}

export default AboutPage;