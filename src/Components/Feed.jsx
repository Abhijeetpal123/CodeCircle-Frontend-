import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, X } from "lucide-react";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function Feed() {
  // =========================
  // STATES
  // =========================
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();

  // =========================
  // FETCH DEVELOPER FEED
  // =========================
  useEffect(() => {
    const getFeed = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `http://localhost:7777/user/feed?page=1&limit=10&search=${debouncedSearch}`,
          {
            withCredentials: true,
          },
        );

        setUsers(response.data.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    getFeed();
  }, [debouncedSearch]);

  // =========================
  // SEND CONNECTION REQUEST
  // =========================
  const handleRequest = async (status, toUserId) => {
    try {
      // Set loading for only the selected user
      setRequestLoading(toUserId);

      await axios.post(
        `http://localhost:7777/request/send/${status}/${toUserId}`,
        {},
        {
          withCredentials: true,
        },
      );

      // Remove user after successful request
      setUsers((previousUsers) =>
        previousUsers.filter((user) => user._id !== toUserId),
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      // Enable buttons again
      setRequestLoading(null);
    }
  };

  // =========================
  // SEARCH DEBOUNCE
  // =========================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-10">
      {/* =================================
          PAGE HEADER
      ================================= */}
      <div className="mx-auto mb-10 max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#2B2A28]">
          Discover Developers
        </h1>

        <p className="mt-2 text-sm text-[#756F68]">
          Find people to connect and collaborate with.
        </p>

        {/* =================================
            SEARCH
        ================================= */}
        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8178]" />

          <input
            type="text"
            placeholder="Search by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-[#EAE1D3] bg-white py-2.5 pl-10 pr-10 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-[#8A8178] transition hover:text-[#2B2A28]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* =================================
          LOADING STATE
      ================================= */}
      {loading ? (
        <p className="text-center text-sm text-[#8A8178]">
          Loading Developers...
        </p>
      ) : users.length === 0 ? (
        /* =================================
            EMPTY / SEARCH RESULT STATE
        ================================= */
        <p className="text-center text-sm text-[#8A8178]">
          {debouncedSearch
            ? `No developers match "${debouncedSearch}".`
            : "You're all caught up — no new developers to show right now."}
        </p>
      ) : (
        /* =================================
            DEVELOPER GRID
            max-w-5xl prevents cards from getting too wide
        ================================= */
        <div className="mx-auto grid max-w-5xl items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user, i) => {
            const skills = user.skills || [];

            return (
              <div
                key={user._id}
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
                    AVATAR (Reduced to h-16 w-16)
                ================================= */}
                <div
                  className="mx-auto mb-3 flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
                  style={{
                    backgroundColor: avatarColors[i % avatarColors.length],
                  }}
                >
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>

                {/* =================================
                    USER NAME
                ================================= */}
                <h3 className="flex items-center justify-center text-base font-bold text-[#2B2A28]">
                  {user.firstName} {user.lastName}
                </h3>

                {/* =================================
                    AGE
                ================================= */}
                <p className="mt-0.5 flex items-center justify-center text-xs text-[#8A8178]">
                  {user.age ? `${user.age} years old` : "Age not added yet"}
                </p>

                {/* =================================
                    ABOUT (Sleeker line-clamp and tighter min-height)
                ================================= */}
                <p className="mt-3 min-h-10 text-[13px] leading-5 text-[#756F68] line-clamp-2">
                  {user.about || "This developer hasn't added an About yet."}
                </p>

                {/* =================================
                    SKILLS
                ================================= */}
                <div className="mt-3 min-h-7">
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#FBF6EF] border border-[#EAE1D3] px-2 py-0.5 text-[11px] font-medium text-[#5B8C6E]"
                      >
                        {skill}
                      </span>
                    ))}
                    {skills.length > 4 && (
                      <span className="rounded-full bg-[#FBF6EF] border border-[#EAE1D3] px-2 py-0.5 text-[11px] font-medium text-[#8A8178]">
                        +{skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* =================================
                    BOTTOM ACTIONS
                    mt-auto pins this block strictly to the bottom
                ================================= */}
                <div className="mt-auto flex flex-col pt-5">
                  {/* =================================
                      VIEW PROFILE
                  ================================= */}
                  <button
                    onClick={() => navigate(`/user/${user._id}`)}
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
                  </button>

                  {/* =================================
                      IGNORE + INTERESTED (Sleeker Buttons)
                  ================================= */}
                  <div className="flex gap-2.5">
                    {/* IGNORE */}
                    <button
                      disabled={requestLoading === user._id}
                      onClick={() => handleRequest("ignored", user._id)}
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
                      {requestLoading === user._id ? "..." : "Ignore"}
                    </button>

                    {/* INTERESTED */}
                    <button
                      disabled={requestLoading === user._id}
                      onClick={() => handleRequest("interested", user._id)}
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
                      {requestLoading === user._id ? "Sending..." : "Interested"}
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