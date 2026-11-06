import { useEffect, useRef } from "react";
import { createSocketConnection } from "../utils/socket";

export default function useChatSocket(
  currentUserId,
  targetUserID,
  setMessages
) {
  const socketRef = useRef(null);

  // Connect socket and listen for incoming messages
  useEffect(() => {
    if (!currentUserId || !targetUserID) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      userId: currentUserId,
      targetUserID,
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUserId, targetUserID, setMessages]);

  // Send message
  const sendMessage = (text) => {
    if (!socketRef.current) return false;

    socketRef.current.emit("sendMessage", {
      userId: currentUserId,
      targetUserID,
      text,
    });

    return true;
  };

  return { sendMessage };
}