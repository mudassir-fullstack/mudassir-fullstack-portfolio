"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import type { About as AboutType } from "@/types/about";

export function useAbout() {
  const [data, setData] = useState<AboutType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await axios.get("/api/about");
        setData(res.data.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  return { data, loading, error };
}
