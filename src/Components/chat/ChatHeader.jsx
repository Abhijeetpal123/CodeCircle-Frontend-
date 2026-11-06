import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { BASE_URL } from "../../utils/constants";



const formatLastSeen = (timestamp) => {
  const diffMinutes = Math.round(
    (Date.now() - new Date(timestamp).getTime()) / 60000
  );

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.round(diffMinutes / 60);

  if (diffHours < 24) return `${diffHours}h ago`;

  return new Date(timestamp).toLocaleDateString();
};

const getProfileImageUrl = (profilePic) => {
  if (!profilePic) return null;

  if (profilePic.startsWith("http")) {
    return profilePic;
  }

  return `${BASE_URL}${profilePic}`;
};

export default function ChatHeader({ targetUser, targetUserID, onBack }) {
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
         <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
  {getProfileImageUrl(targetUser?.profilePic) ? (
    <img
      src={getProfileImageUrl(targetUser.profilePic)}
      alt={`${targetUser?.firstName || ""} ${targetUser?.lastName || ""}`}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-[#5B8C6E] text-lg font-bold uppercase tracking-wide text-white">
      {targetUser?.firstName?.[0] || ""}
      {targetUser?.lastName?.[0] || ""}
    </div>
  )}
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

