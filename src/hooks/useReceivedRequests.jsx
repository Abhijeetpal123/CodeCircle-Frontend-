import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useReceivedRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRequest = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${BASE_URL}/user/request/received`,
          { withCredentials: true }
        );

        setRequests(response.data.data || []);
      } catch (err) {
        console.error("Failed to load requests:", err);
        setError("Failed to load connection requests.");
      } finally {
        setLoading(false);
      }
    };

    getRequest();
  }, []);

  return { requests, setRequests, loading, error };
}