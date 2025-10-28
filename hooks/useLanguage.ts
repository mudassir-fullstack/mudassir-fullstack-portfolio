import { useState, useEffect } from "react";
import axios from "axios";
import { Language } from "@/types/language";

export const useLanguages = () => {
  const [data, setData] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("/api/languages");
        setData(res.data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { data, loading, error };
};
