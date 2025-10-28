import axios from "axios";
import { useState } from "react";
import { ContactType } from "@/types/contact";

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (data: ContactType) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/contact", data);
      setSuccess(res.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, success, error };
};
