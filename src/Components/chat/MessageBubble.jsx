import { BASE_URL } from "../../utils/constants";


const getProfileImageUrl = (profilePic) => {
  if (!profilePic) return null;

  if (profilePic.startsWith("http")) {
    return profilePic;
  }

  return `${BASE_URL}${profilePic}`;
};

export default function MessageBubble({ message, isOwn, profilePic }) {
  return (
    <div
      className={`flex items-end gap-2 ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwn && (
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
          {getProfileImageUrl(profilePic) ? (
            <img
              src={getProfileImageUrl(profilePic)}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#5B8C6E] text-xs font-bold text-white">
              ?
            </div>
          )}
        </div>
      )}

      <div className="max-w-[85%] md:max-w-[70%]">
        <div
          className={`px-4 py-2.5 text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap ${
            isOwn
              ? "rounded-2xl rounded-br-sm bg-[#5B8C6E] text-white"
              : "rounded-2xl rounded-bl-sm border border-[#EAE1D3] bg-white text-[#2B2A28]"
          }`}
        >
          {message.text}
        </div>

        {message.createdAt && (
          <p
            className={`mx-1 mt-1 text-[11px] text-[#8A8178] ${
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

      {isOwn && (
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full">
          {getProfileImageUrl(profilePic) ? (
            <img
              src={getProfileImageUrl(profilePic)}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#E8624F] text-xs font-bold text-white">
              You
            </div>
          )}
        </div>
      )}
    </div>
  );
}