import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useChatUsers(targetUserID) {
  const [currentUsers, setCurrentUsers] = useState(null);
  const [targetUser, setTargetUser] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });

        setCurrentUsers(response.data);
      } catch (err) {
        console.error("PROFILE ERROR:", err.response?.data || err.message);
      }
    };

    getProfile();
  }, []);

  // Fetch target user
  useEffect(() => {
    const getTargetUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${targetUserID}`, {
          withCredentials: true,
        });

        setTargetUser(response.data.data || response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    if (targetUserID) getTargetUser();
  }, [targetUserID]);

  return {
    currentUsers,
    targetUser,
  };
}