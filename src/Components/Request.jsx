import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(null);

  useEffect(() => {
    const getRequest = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7777/user/request/received",
          { withCredentials: true },
        );
        console.log(response.data);
        setRequests(response.data.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    getRequest();
  }, []);

  const handleReview = async (status, requestId) => {
    setReviewLoading(requestId);
    try {
      await axios.post(
        `http://localhost:7777/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );

      setRequests((previousRequests) =>
        previousRequests.filter((request) => request._id !== requestId),
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setReviewLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-10">
      
      {/* =================================
          PAGE HEADER
      ================================= */}
      <div className="mx-auto mb-10 max-w-md text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-[#2B2A28]">
            Connection Requests
          </h1>
          {requests.length > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#E8624F] px-1.5 text-xs font-bold text-white shadow-sm">
              {requests.length}
            </span>
          )}
        </div>
        <p className="text-sm text-[#756F68]">
          Review people who want to connect with you.
        </p>
      </div>

      {requests.length === 0 ? (
        /* =================================
            EMPTY STATE
        ================================= */
        <p className="text-center text-sm text-[#8A8178]">
          No pending requests right now — you're all caught up.
        </p>
      ) : (
        /* =================================
            REQUEST GRID (Uniform sizing)
        ================================= */
        <div className="mx-auto grid max-w-5xl items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {requests.map((request, i) => {
            const color = avatarColors[i % avatarColors.length];
            const user = request.fromUserId;
            const skills = user.skills || [];
            const visibleSkills = skills.slice(0, 4);
            const extraSkillsCount = skills.length - visibleSkills.length;

            return (
              <div
                key={request._id}
                className="
                  flex h-full flex-col
                  rounded-2xl
                  bg-white
                  p-5
                  text-center
                  shadow-lg shadow-[#E8624F]/5
                  border border-[#EAE1D3]/50
                  transition
                  hover:-translate-y-1
                  hover:shadow-xl hover:shadow-[#E8624F]/10
                "
              >
                {/* =================================
                    AVATAR
                ================================= */}
                <div className="relative mx-auto mb-3 h-16 w-16 shrink-0">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-base font-bold text-white"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 0 4px ${color}26`,
                    }}
                  >
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </div>
                </div>

                {/* =================================
                    USER NAME
                ================================= */}
                <h3 className="flex items-center justify-center text-base font-bold text-[#2B2A28]">
                  {user.firstName} {user.lastName}
                </h3>

                {/* =================================
                    STATUS 
                ================================= */}
                <p className="mt-0.5 flex items-center justify-center text-[11px] font-semibold uppercase tracking-wide text-[#E8624F]">
                  Wants to connect
                </p>

                {/* =================================
                    ABOUT (Fixed min-height)
                ================================= */}
                <p className="mt-3 min-h-10 text-[13px] leading-5 text-[#756F68] line-clamp-2">
                  {user.about || "This developer hasn't added an About yet."}
                </p>

                {/* =================================
                    SKILLS (Fixed min-height)
                ================================= */}
                <div className="mt-3 min-h-7">
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {visibleSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#FBF6EF] border border-[#EAE1D3] px-2 py-0.5 text-[11px] font-medium text-[#5B8C6E]"
                      >
                        {skill}
                      </span>
                    ))}
                    {extraSkillsCount > 0 && (
                      <span className="rounded-full bg-[#FBF6EF] border border-[#EAE1D3] px-2 py-0.5 text-[11px] font-medium text-[#8A8178]">
                        +{extraSkillsCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* =================================
                    BOTTOM ACTIONS
                    mt-auto pins this block to the bottom
                ================================= */}
                <div className="mt-auto flex flex-col pt-5">
                  
                  {/* VIEW PROFILE */}
                  <Link 
                    to={`/user/${user._id}`}
                    className="
                      mb-3
                      inline-flex
                      items-center
                      justify-center
                      text-[13px]
                      font-bold
                      text-[#5B8C6E]
                      transition
                      hover:text-[#4A7359]
                      hover:underline
                    "
                  >
                    View Profile →
                  </Link>

                  <div className="flex gap-2.5">
                    {/* REJECT BUTTON */}
                    <button
                      disabled={reviewLoading === request._id}
                      onClick={() => handleReview("rejected", request._id)}
                      className="
                        flex-1
                        cursor-pointer
                        rounded-full
                        border
                        border-[#EAE1D3]
                        px-3
                        py-2
                        text-[13px]
                        font-semibold
                        text-[#8A8178]
                        transition
                        hover:bg-[#FBF6EF] hover:text-[#2B2A28]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {reviewLoading === request._id ? "..." : "Reject"}
                    </button>

                    {/* ACCEPT BUTTON */}
                    <button
                      disabled={reviewLoading === request._id}
                      onClick={() => handleReview("accepted", request._id)}
                      className="
                        flex-1
                        cursor-pointer
                        rounded-full
                        bg-[#E8624F]
                        px-3
                        py-2
                        text-[13px]
                        font-semibold
                        text-white
                        shadow-sm
                        shadow-[#E8624F]/20
                        transition
                        hover:bg-[#DA5544]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      {reviewLoading === request._id ? "Saving..." : "Accept"}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}