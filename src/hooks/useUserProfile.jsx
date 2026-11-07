import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useUserProfile(userId) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const getUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      setUser(null);

      try {
        const response = await axios.get(
          `${BASE_URL}/user/${userId}`,
          { withCredentials: true }
        );

        if (isActive) {
          setUser(response.data.data);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err.response?.data?.message ||
              err.response?.data ||
              "Couldn't load this profile."
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    getUserProfile();

    return () => {
      isActive = false;
    };
  }, [userId]);

  return { user, isLoading, error };
}