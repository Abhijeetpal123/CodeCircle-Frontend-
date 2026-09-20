import { useState, useEffect } from "react";
import axios from "axios";
import { Search, X, Users, AlertCircle } from "lucide-react";
import UserCard from "./UserCard";
import toast from 'react-hot-toast';

export default function Feed() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestLoading, setRequestLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const getFeed = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `http://localhost:7777/user/feed?page=1&limit=12&search=${debouncedSearch}`,
          { withCredentials: true }
        );
        setUsers(response.data.data || []);
      } catch (err) {
        setError("Unable to load developers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getFeed();
  }, [debouncedSearch]);

  const handleRequest = async (status, toUserId) => {
  try {
    setRequestLoading(toUserId);
    await axios.post(
      `http://localhost:7777/request/send/${status}/${toUserId}`,
      {},
      { withCredentials: true }
    );
    
    // User ko list se hatao
    setUsers((prev) => prev.filter((user) => user._id !== toUserId));

    if (status === "interested") {
      toast.success("Connection request sent!"); 
    } else {
      toast("User ignored", { icon: '👋' }); // Ignore ke liye normal toast
    }

  } catch (err) {
    // Error aane par laal rang ka error toast aayega
    toast.error("Failed to send request. Please try again.");
  } finally {
    setRequestLoading(null);
  }
};

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-6 font-sans">
      {/* Custom keyframes to match Connection.jsx */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .shimmer-bg {
          background: linear-gradient(90deg, #EAE1D3 0%, #FBF6EF 50%, #EAE1D3 100%);
          background-size: 800px 100%;
          animation: shimmer 1.4s infinite linear;
        }
      `}</style>

      <div className="mx-auto mb-10 max-w-md text-center group">
        <h1 className="cursor-default text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#5B8C6E] via-[#4A7359] to-[#E8624F] transition-transform duration-500 hover:scale-105">
          Discover Developers
        </h1>
        <p className="mt-2 text-sm text-[#756F68] transition-colors duration-300 group-hover:text-[#2B2A28]">
          Find the right people to connect and collaborate with.
        </p>

        <div className="relative mt-6 shadow-sm rounded-full transition-shadow duration-300 focus-within:shadow-lg focus-within:shadow-[#5B8C6E]/20">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A8178] transition-colors duration-300 peer-focus:text-[#5B8C6E]" />
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="peer w-full rounded-full border border-[#EAE1D3] bg-white py-3.5 pl-12 pr-10 text-sm text-[#2B2A28] outline-none transition-all duration-300 focus:border-[#5B8C6E] focus:ring-4 focus:ring-[#5B8C6E]/10"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8A8178] transition-all hover:bg-[#FBF6EF] hover:text-[#E8624F] hover:rotate-90"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-xl border border-[#C4483D]/20 bg-[#C4483D]/5 p-6 text-[#C4483D]">
          <AlertCircle className="mb-2 h-8 w-8 animate-bounce" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* SKELETON LOADING (Matching exact size of Connection.jsx) */}
      {loading && !error ? (
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex h-80 flex-col rounded-3xl bg-white p-5 shadow-sm border border-[#EAE1D3]/50">
              <div className="shimmer-bg mx-auto h-16 w-16 rounded-full" />
              <div className="shimmer-bg mx-auto mt-4 h-4 w-3/4 rounded-full" />
              <div className="shimmer-bg mx-auto mt-2 h-3 w-1/2 rounded-full" />
              <div className="mt-6 space-y-2">
                <div className="shimmer-bg h-3 w-full rounded-full" />
                <div className="shimmer-bg h-3 w-5/6 rounded-full" />
              </div>
              <div className="mt-auto flex gap-2 pt-5">
                <div className="shimmer-bg h-10 flex-1 rounded-xl" />
                <div className="shimmer-bg h-10 flex-1 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : !error && users.length === 0 ? (
        <div className="mx-auto mt-16 flex max-w-sm flex-col items-center justify-center rounded-3xl border border-[#EAE1D3]/80 bg-white p-10 text-center shadow-xl shadow-[#E8624F]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-[#FBF6EF] to-[#EAE1D3] shadow-inner transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            <Users className="h-10 w-10 text-[#8A8178] transition-colors duration-300 group-hover:text-[#E8624F]" />
          </div>
          <h3 className="mt-6 text-xl font-bold text-[#2B2A28]">No developers found</h3>
          <p className="mt-2 text-[13px] text-[#756F68] leading-relaxed">
            {debouncedSearch
              ? `We couldn't find anyone matching "${debouncedSearch}".`
              : "You're all caught up! Check back later for new developers."}
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user, i) => {
            const isActionLoading = requestLoading === user._id;

            return (
              <div
                key={user._id}
                style={{
                  animation: "fadeInUp 0.5s ease-out both",
                  animationDelay: `${i * 70}ms`,
                }}
              >
                <UserCard user={user} index={i}>
                  <button
                    disabled={isActionLoading}
                    onClick={() => handleRequest("ignored", user._id)}
                    className="flex-1 rounded-xl border border-[#EAE1D3] px-3 py-2 text-[13px] font-semibold text-[#8A8178] transition-all hover:bg-[#FBF6EF] hover:text-[#2B2A28] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    {isActionLoading ? "..." : "Ignore"}
                  </button>
                  <button
                    disabled={isActionLoading}
                    onClick={() => handleRequest("interested", user._id)}
                    className="flex-1 rounded-xl bg-[#E8624F] px-3 py-2 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#DA5544] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    {isActionLoading ? "Sending..." : "Interested"}
                  </button>
                </UserCard>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}