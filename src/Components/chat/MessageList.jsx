import { useEffect, useRef } from "react";
import {
  Loader2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

import MessageBubble from "./MessageBubble";

export default function MessageList({ messages,
  currentUserId,
  currentUser,
  targetUser,
  isLoading,
  error,
  onRetry, }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#8A8178]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <AlertCircle className="h-6 w-6 text-[#C4483D]" />
        <p className="text-sm text-[#C4483D]">{error}</p>
        <button
          onClick={onRetry}
          className="rounded-full border border-[#EAE1D3] px-4 py-1.5 text-sm font-semibold text-[#5B8C6E] transition hover:bg-[#F3E9DC]"
        >
          Retry
        </button>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
        <div className="mb-1 flex h-14 w-14 items-center justify-center rounded-full bg-[#EAE1D3]">
          <MessageSquare className="h-7 w-7 text-[#5B8C6E]" />
        </div>
        <p className="font-semibold text-lg text-[#2B2A28]">
          Start a conversation
        </p>
        <p className="max-w-xs text-sm text-[#8A8178]">
          Connect with this developer and start talking about projects,
          technologies, or opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6 bg-white">
      {messages.map((msg, index) => {
  const isOwn = String(msg.senderId) === String(currentUserId);

  const profilePic = isOwn
    ? currentUser?.profilePic
    : targetUser?.profilePic;

  return (
    <MessageBubble
      key={msg._id || index}
      message={msg}
      isOwn={isOwn}
      profilePic={profilePic}
    />
  );
})}
      <div ref={bottomRef} />
    </div>
  );
}