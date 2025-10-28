"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { LinkType } from "@/types/links";

export function useLinks() {
  const [data, setData] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = async () => {
    try {
      const res = await axios.get("/api/links");
      setData(res.data.data || []);
    } catch (err: any) {
      console.error("❌ Error fetching links:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return { data, loading, error };
}
