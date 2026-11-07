import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useConnections() {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getConnections = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(
          `${BASE_URL}/user/connections`,
          { withCredentials: true }
        );

        setConnections(response.data.data || []);
      } catch (err) {
        console.error(err.response?.data || err.message);

        setError(
          err.response?.data?.message ||
          err.response?.data ||
          "Couldn't load your connections."
        );
      } finally {
        setIsLoading(false);
      }
    };

    getConnections();
  }, []);

  return { connections, isLoading, error };
}