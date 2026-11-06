import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useConversationStarters(targetUserID) {
  const [startersData, setStartersData] = useState({
    targetId: null,
    list: [],
  });

  const [isLoadingStarters, setIsLoadingStarters] = useState(false);
  const [startersError, setStartersError] = useState(null);

  // Show starters only for the currently selected conversation
  const starters =
    startersData.targetId === targetUserID ? startersData.list : [];

  // Generate conversation starters
  const generateStarters = async () => {
    if (!targetUserID) return;

    setStartersError(null);
    setIsLoadingStarters(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/ai/conversation-starters/${targetUserID}`,
        {},
        { withCredentials: true }
      );

      setStartersData({
        targetId: targetUserID,
        list: res.data.starters || [],
      });
    } catch (err) {
      console.error(err.response?.data || err.message);

      setStartersError(
        err.response?.data?.message ||
          "Couldn't generate suggestions. Try again."
      );
    } finally {
      setIsLoadingStarters(false);
    }
  };

  return {
    starters,
    isLoadingStarters,
    startersError,
    generateStarters,
  };
}