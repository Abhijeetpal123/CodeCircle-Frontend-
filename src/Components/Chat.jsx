import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import {
  ArrowLeft,
  MoreVertical,
  Loader2,
  AlertCircle,
  MessageSquare,
  Send,
} from "lucide-react";

const formatLastSeen = (timestamp) => {
  const diffMinutes = Math.round(
    (Date.now() - new Date(timestamp).getTime()) / 60000,
  );
  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return new Date(timestamp).toLocaleDateString();
};

// ---- local UI pieces, all in this one file ----

function ChatHeader({ targetUser, targetUserID, onBack }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Yahan route path ko /user
  const profileUrl = `/user/${targetUserID}`;

  return (
    <div className="flex shrink-0 items-center justify-between border-b border-[#EAE1D3] bg-white px-4 py-3 sm:px-6 z-10">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onBack}
          aria-label="Back"
          className="shrink-0 rounded-lg p-2 -ml-2 text-[#8A8178] transition hover:bg-[#FBF6EF] hover:text-[#2B2A28]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Clickable Profile Section (Avatar + Name) */}
        <button
          onClick={() => navigate(profileUrl)}
          className="flex items-center gap-3 text-left transition-opacity hover:opacity-80 focus:outline-none"
        >
          {/* Avatar based on image_8c2408.png */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5B8C6E] text-lg font-bold text-white uppercase tracking-wide">
            {targetUser?.firstName?.[0] || ""}
            {targetUser?.lastName?.[0] || ""}
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-bold text-[#2B2A28] capitalize tracking-tight">
              {targetUser
                ? `${targetUser.firstName} ${targetUser.lastName}`
                : "Loading..."}
            </p>

            {/* Online Status / Role */}
            {typeof targetUser?.isOnline === "boolean" ? (
              <p
                className={`text-xs ${
                  targetUser.isOnline ? "text-[#5B8C6E]" : "text-[#8A8178]"
                }`}
              >
                {targetUser.isOnline
                  ? "Online"
                  : targetUser.lastSeenAt
                    ? `Last seen ${formatLastSeen(targetUser.lastSeenAt)}`
                    : "Offline"}
              </p>
            ) : (
              targetUser?.skills?.[0] && (
                <p className="truncate text-xs text-[#8A8178] capitalize">
                  {targetUser.skills[0]} developer
                </p>
              )
            )}
          </div>
        </button>
      </div>

      <div className="relative shrink-0">
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="More options"
          className="rounded-lg p-2 text-[#8A8178] transition hover:bg-[#FBF6EF] hover:text-[#2B2A28]"
        >
          <MoreVertical className="h-5 w-5" />
        </button>

        {menuOpen && (
          <div
            onMouseLeave={() => setMenuOpen(false)}
            className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl border border-[#EAE1D3] bg-white py-1 shadow-lg"
          >
            <Link
              to={profileUrl}
              onClick={() => setMenuOpen(false)}
              className="block w-full px-4 py-2.5 text-left text-sm font-medium text-[#2B2A28] transition hover:bg-[#F3E9DC]"
            >
              View Profile
            </Link>

            <button
              disabled
              className="block w-full cursor-not-allowed px-4 py-2.5 text-left text-sm text-[#8A8178]/50"
            >
              Search Messages
            </button>
            <button
              disabled
              className="block w-full cursor-not-allowed px-4 py-2.5 text-left text-sm text-[#8A8178]/50"
            >
              Clear Chat
            </button>
            <button
              disabled
              className="block w-full cursor-not-allowed px-4 py-2.5 text-left text-sm text-[#C4483D]/50"
            >
              Block User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MessageBubble({ message, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[85%] md:max-w-[70%]">
        <div
          className={`px-4 py-2.5 text-[15px] leading-relaxed shadow-sm wrap-break- whitespace-pre-wrap ${
            isOwn
              ? "rounded-2xl rounded-br-sm bg-[#5B8C6E] text-white"
              : "rounded-2xl rounded-bl-sm border border-[#EAE1D3] bg-white text-[#2B2A28]"
          }`}
        >
          {message.text}
        </div>

        {message.createdAt && (
          <p
            className={`mt-1 text-[11px] text-[#8A8178] mx-1 ${
              isOwn ? "text-right" : "text-left"
            }`}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
}

function MessageList({ messages, currentUserId, isLoading, error, onRetry }) {
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
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg._id || index}
          message={msg}
          isOwn={msg.senderId === currentUserId}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function ChatInput({ message, setMessage, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="border-t border-[#EAE1D3] bg-white px-4 py-3 sm:px-6 shrink-0">
      <div className="flex items-end gap-3 mx-auto">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message..."
          rows={1}
          className="max-h-32 flex-1 resize-none rounded-2xl border border-[#EAE1D3] bg-[#FBF6EF] px-4 py-3 text-[15px] text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-1 focus:ring-[#5B8C6E] custom-scrollbar"
        />

        <button
          onClick={onSend}
          disabled={!message.trim()}
          aria-label="Send message"
          className="flex h-11.5 w-11.5 shrink-0 items-center justify-center rounded-full bg-[#5B8C6E] text-white transition hover:bg-[#4A7359] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#5B8C6E]"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      <div className="text-center mt-2 hidden sm:block">
        <span className="text-[11px] text-[#8A8178]">
          <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for new
          line
        </span>
      </div>
    </div>
  );
}

// ---- main component ----

export default function Chat() {
  const { userId: targetUserID } = useParams();
  const navigate = useNavigate();
  const [currentUsers, setCurrentUsers] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        console.log("1. PROFILE REQUEST START");

        const response = await axios.get("http://localhost:7777/profile/view", {
          withCredentials: true,
        });

        console.log("2. PROFILE RESPONSE:", response.data);

        setCurrentUsers(response.data);
      } catch (err) {
        console.error("PROFILE ERROR:", err.response?.data || err.message);
      }
    };

    getProfile();
  }, []);

  useEffect(() => {
    const getTargetUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7777/user/${targetUserID}`,
          { withCredentials: true },
        );
        setTargetUser(response.data.data || response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    if (targetUserID) getTargetUser();
  }, [targetUserID]);

  // Create Socket + Join Chat
  useEffect(() => {
    console.log("3. SOCKET EFFECT");
    console.log("current user:", currentUsers);
    console.log("target user:", targetUserID);

    if (!currentUsers?._id || !targetUserID) {
      console.log("4. SOCKET RETURNED EARLY");
      return;
    }

    const socket = createSocketConnection();
    socketRef.current = socket;

    console.log("5. SOCKET CREATED");

    socket.emit("joinChat", {
      userId: currentUsers._id,
      targetUserID,
    });

    socket.on("receiveMessage", (message) => {
      console.log("Message Received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    console.log("6. JOIN CHAT EMITTED");

    return () => {
      socket.disconnect();
    };
  }, [currentUsers, targetUserID]);

  const getChatHistory = async () => {
    if (!currentUsers?._id || !targetUserID) return;

    setHistoryError(null);
    setIsLoadingHistory(true);
    try {
      const response = await axios.get(
        `http://localhost:7777/chat/${targetUserID}`,
        {
          withCredentials: true,
        },
      );
      setMessages(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setHistoryError("Couldn't load this conversation.");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    getChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUsers, targetUserID]);

  const handleSend = () => {
    if (!message.trim()) return;

    socketRef.current.emit("sendMessage", {
      userId: currentUsers._id,
      targetUserID,
      text: message,
    });
    setMessage("");
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
        isLoading={isLoadingHistory}
        error={historyError}
        onRetry={getChatHistory}
      />

      <ChatInput
        message={message}
        setMessage={setMessage}
        onSend={handleSend}
      />
    </main>
  );
}
