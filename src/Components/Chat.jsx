import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ChatHeader from "./chat/ChatHeader";
import MessageList from "./chat/MessageList";
import ChatInput from "./chat/ChatInput";
import ConversationStarters from "./chat/ConversationStarters";

import useChatHistory from "../hooks/useChatHistory";
import useChatSocket from "../hooks/useChatSocket";
import useConversationStarters from "../hooks/useConversationStarters";
import useChatUsers from "../hooks/useChatUsers";

export default function Chat() {
  const { userId: targetUserID } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  // Custom hook: User Data
  const { currentUsers, targetUser } = useChatUsers(targetUserID);

  // Custom hook: Chat History
  const {
    messages,
    setMessages,
    isLoadingHistory,
    historyError,
    historyTargetId,
    getChatHistory,
  } = useChatHistory(currentUsers?._id, targetUserID);

  // Custom hook: Socket Communication
  const { sendMessage } = useChatSocket(
    currentUsers?._id,
    targetUserID,
    setMessages
  );

  // Custom hook: Conversation Starters
  const {
    starters,
    isLoadingStarters,
    startersError,
    generateStarters,
  } = useConversationStarters(targetUserID);

  // Send message
  const handleSend = () => {
    if (!message.trim()) return;

    const sent = sendMessage(message);

    if (sent) {
      setMessage("");
    }
  };

  return (
    <main className="flex h-dvh flex-col bg-[#FBF6EF] font-sans text-[#2B2A28]">
      <ChatHeader
        targetUser={targetUser}
        targetUserID={targetUserID}
        onBack={() => navigate(-1)}
      />

      <MessageList
        messages={messages}
        currentUserId={currentUsers?._id}
        currentUser={currentUsers}
        targetUser={targetUser}
        isLoading={isLoadingHistory || historyTargetId !== targetUserID}
        error={historyError}
        onRetry={getChatHistory}
      />

      {!isLoadingHistory &&
        historyTargetId === targetUserID &&
        !historyError &&
        messages.length === 0 && (
          <ConversationStarters
            starters={starters}
            isLoading={isLoadingStarters}
            error={startersError}
            onGenerate={generateStarters}
            onPick={(text) => setMessage(text)}
          />
        )}

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
      />
    </main>
  );
}