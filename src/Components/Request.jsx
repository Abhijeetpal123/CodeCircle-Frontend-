import { useEffect, useState } from "react";
import axios from "axios";
import { UserCheck, AlertCircle, Inbox } from "lucide-react";
import UserCard from "./UserCard";

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewLoading, setReviewLoading] = useState(null);

  useEffect(() => {
    const getRequest = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "https://codecircle-nq5c.onrender.com/user/request/received",
          { withCredentials: true }
        );
        setRequests(response.data.data || []);
      } catch (err) {
        setError("Failed to load connection requests.");
      } finally {
        setLoading(false);
      }
    };
    getRequest();
  }, []);

  const handleReview = async (status, requestId) => {
    setReviewLoading(requestId);
    try {
      await axios.post(
        `https://codecircle-nq5c.onrender.com/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setReviewLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-6 font-sans">
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
        <div className="mb-2 flex items-center justify-center gap-3">
          <h1 className="cursor-default text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#5B8C6E] via-[#4A7359] to-[#E8624F] transition-transform duration-500 hover:scale-105">
            Connection Requests
          </h1>
          {requests.length > 0 && !loading && (
            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#E8624F] px-2 text-sm font-bold text-white shadow-md animate-bounce">
              {requests.length}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-[#756F68]">
          Review people who want to connect and collaborate with you.
        </p>
      </div>

      {error && (
        <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-xl border border-[#C4483D]/20 bg-[#C4483D]/5 p-6 text-[#C4483D]">
          <AlertCircle className="mb-2 h-8 w-8 animate-bounce" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {loading && !error ? (
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
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
      ) : !error && requests.length === 0 ? (
        <div className="mx-auto mt-16 flex max-w-sm flex-col items-center justify-center rounded-3xl border border-[#EAE1D3]/80 bg-white p-10 text-center shadow-xl shadow-[#5B8C6E]/5 transition-all duration-500 hover:-translate-y-2">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-tr from-[#FBF6EF] to-[#EAE1D3] shadow-inner">
            <Inbox className="h-10 w-10 text-[#8A8178]" />
          </div>
          <h3 className="mt-6 text-xl font-bold text-[#2B2A28]">Inbox Zero</h3>
          <p className="mt-2 text-[13px] text-[#756F68] leading-relaxed">
            No pending requests right now — you're all caught up.
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {requests.map((request, i) => {
            const isActionLoading = reviewLoading === request._id;

            return (
              <div
                key={request._id}
                style={{
                  animation: "fadeInUp 0.5s ease-out both",
                  animationDelay: `${i * 70}ms`,
                }}
              >
                <UserCard 
                  user={request.fromUserId} 
                  index={i} 
                  statusText="Wants to connect"
                  statusColor="#E8624F"
                >
                  <button
                    disabled={isActionLoading}
                    onClick={() => handleReview("rejected", request._id)}
                    className="flex-1 rounded-xl border border-[#EAE1D3] px-3 py-2.5 text-[13px] font-semibold text-[#8A8178] transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isActionLoading ? "..." : "Reject"}
                  </button>
                  <button
                    disabled={isActionLoading}
                    onClick={() => handleReview("accepted", request._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#5B8C6E] px-3 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#4A7359] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isActionLoading ? "Saving..." : <><UserCheck className="h-4 w-4" /> Accept</>}
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