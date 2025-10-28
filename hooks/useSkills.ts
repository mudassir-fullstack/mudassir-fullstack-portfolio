"use client";

import { useEffect, useState } from "react";
import { SkillType } from "@/types/skills"; 

export const useSkillsAndTools = (category?: "skill" | "tool") => {
  const [data, setData] = useState<SkillType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = category
          ? `/api/skills?category=${category}`
          : `/api/skills`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();
        setData(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return { data, loading, error };
};
