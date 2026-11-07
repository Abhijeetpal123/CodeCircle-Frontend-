import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useFeedUsers(debouncedSearch) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `${BASE_URL}/user/feed?page=1&limit=12&search=${debouncedSearch}`,
          { withCredentials: true }
        );

        setUsers(response.data.data || []);
      } catch (err) {
        console.error("Feed fetch failed:", err);
        setError("Unable to load developers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, [debouncedSearch]);

  return { users, setUsers, loading, error };
}