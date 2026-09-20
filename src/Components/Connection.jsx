import { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";

export default function Connection() {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getConnections = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          "http://localhost:7777/user/connections",
          { withCredentials: true }
        );
        setConnections(response.data.data || []);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError(
          err.response?.data?.message ||
          err.response?.data ||
          "Couldn't load your connections."
        );
      } finally {
        setIsLoading(false);
      }
    };
    getConnections();
  }, []);

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-6 font-sans">
      {/* Custom keyframes — no plugin needed, works regardless of tailwind.config.js */}
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

      <div className="mx-auto mb-6 max-w-md text-center group">
        <div className="mb-1 flex items-center justify-center gap-3">
          <h1 className="cursor-default text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#5B8C6E] via-[#4A7359] to-[#E8624F] transition-transform duration-500 hover:scale-105">
            Your Connections
          </h1>
          {connections.length > 0 && !isLoading && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#5B8C6E] px-2 text-xs font-bold text-white shadow-md">
              {connections.length}
            </span>
          )}
        </div>
        <p className="text-sm text-[#756F68] transition-colors duration-300 group-hover:text-[#2B2A28]">
          People you've successfully connected with.
        </p>
      </div>

      {error && (
        <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-xl border border-[#C4483D]/20 bg-[#C4483D]/5 p-6 text-[#C4483D]">
          <AlertCircle className="mb-2 h-8 w-8 animate-bounce" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {isLoading && !error ? (
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex h-80 flex-col rounded-3xl bg-white p-5 shadow-sm border border-[#EAE1D3]/50"
            >
              <div className="shimmer-bg mx-auto h-16 w-16 rounded-full" />
              <div className="shimmer-bg mx-auto mt-4 h-4 w-3/4 rounded-full" />
              <div className="shimmer-bg mx-auto mt-2 h-3 w-1/2 rounded-full" />
              <div className="mt-6 space-y-2">
                <div className="shimmer-bg h-3 w-full rounded-full" />
                <div className="shimmer-bg h-3 w-5/6 rounded-full" />
              </div>
              <div className="mt-auto flex pt-5">
                <div className="shimmer-bg h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : !error && connections.length === 0 ? (
        <div className="mx-auto mt-16 flex max-w-sm flex-col items-center justify-center rounded-3xl border border-[#EAE1D3]/80 bg-white p-10 text-center shadow-xl shadow-[#5B8C6E]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-tr from-[#FBF6EF] to-[#EAE1D3] shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Users className="h-10 w-10 text-[#8A8178] transition-colors duration-300 group-hover:text-[#5B8C6E]" />
          </div>
          <h3 className="mt-6 text-xl font-bold text-[#2B2A28]">No connections yet</h3>
          <p className="mt-2 text-[13px] text-[#756F68] leading-relaxed">
            Go say hi to someone in Discover and start building your network!
          </p>
          <Link to="/feed">
            <button className="mt-6 rounded-full bg-[#5B8C6E] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#4A7359] hover:-translate-y-1 active:scale-95">
              Explore Discover
            </button>
          </Link>
        </div>
      ) : (
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {connections.map((connection, i) => (
            <div
              key={connection._id}
              style={{
                animation: "fadeInUp 0.5s ease-out both",
                animationDelay: `${i * 70}ms`,
              }}
            >
              <UserCard
                user={connection}
                index={i}
                statusText="Connected"
                statusColor="#5B8C6E"
              >
                <Link to={`/chat/${connection._id}`} className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#5B8C6E] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#4A7359] hover:shadow-md active:scale-95">
                    <MessageSquare className="h-4 w-4" /> Message
                  </button>
                </Link>
              </UserCard>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}