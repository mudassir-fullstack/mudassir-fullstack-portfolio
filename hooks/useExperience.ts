"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { experience as ExperienceType } from "@/types/experience";

export const useExperience = () => {
  const [data, setData] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use GET to fetch experiences
      const res = await axios.get("/api/experience");
      setData(res.data.data || []);
    } catch (err: any) {
      console.error("❌ Error fetching experiences:", err);
      setError(err.message || "Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  return { data, loading, error };
};

