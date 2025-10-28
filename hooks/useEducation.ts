"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EducationType } from "@/types/education";

export const useEducation = () => {
  const [data, setData] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEducation = async () => {
    try {
      const res = await axios.get("/api/education");
      setData(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch education");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  return { data, loading, error };
};
