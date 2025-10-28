"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CertificateType } from "@/types/certificate";

export const useCertificates = () => {
  const [data, setData] = useState<CertificateType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get("/api/certificate");
        setData(res.data.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return { data, loading, error };
};
