import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const requestChatHistory = async (targetUserID) => {
  const response = await axios.get(`${BASE_URL}/chat/${targetUserID}`, {
    withCredentials: true,
  });

  return response.data;
};

export default function useChatHistory(currentUserId, targetUserID) {
  const [messages, setMessages] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState(null);
  const [historyTargetId, setHistoryTargetId] = useState(null);

  useEffect(() => {
    if (!currentUserId || !targetUserID) return;

    let cancelled = false;

    const loadChatHistory = async () => {
      try {
        const chatHistory = await requestChatHistory(targetUserID);

        if (!cancelled) {
          setMessages(chatHistory);
          setHistoryError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err.response?.data || err.message);
          setHistoryError("Couldn't load this conversation.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingHistory(false);
          setHistoryTargetId(targetUserID);
        }
      }
    };

    loadChatHistory();

    return () => {
      cancelled = true;
    };
  }, [currentUserId, targetUserID]);

  const getChatHistory = async () => {
    if (!currentUserId || !targetUserID) return;

    setHistoryError(null);
    setIsLoadingHistory(true);

    try {
      const chatHistory = await requestChatHistory(targetUserID);
      setMessages(chatHistory);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setHistoryError("Couldn't load this conversation.");
    } finally {
      setIsLoadingHistory(false);
      setHistoryTargetId(targetUserID);
    }
  };

  return {
    messages,
    setMessages,
    isLoadingHistory,
    historyError,
    historyTargetId,
    getChatHistory,
  };
}