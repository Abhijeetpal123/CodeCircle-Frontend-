import { useEffect, useState } from "react";
import axios from "axios";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function Request() {
  const [requests, setRequests] = useState([]);

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
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-10">
      <div className="mx-auto mb-10 max-w-md text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-[#2B2A28]">
            Connection Requests
          </h1>
          {requests.length > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#E8624F] px-1.5 text-xs font-bold text-white">
              {requests.length}
            </span>
          )}
        </div>
        <p className="text-sm text-[#756F68]">
          Review people who want to connect with you.
        </p>
      </div>

      {requests.length === 0 ? (
        <p className="text-center text-sm text-[#8A8178]">
          No pending requests right now — you're all caught up.
        </p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((request, i) => {
            const color = avatarColors[i % avatarColors.length];
            return (
              <div
                key={request._id}
                className="flex flex-col rounded-3xl bg-white p-8 text-center shadow-xl shadow-[#E8624F]/10 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 0 6px ${color}26`,
                  }}
                >
                  {request.fromUserId.firstName?.[0]}
                  {request.fromUserId.lastName?.[0]}
                </div>

                <h3 className="text-lg font-bold text-[#2B2A28]">
                  {request.fromUserId.firstName} {request.fromUserId.lastName}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#5B8C6E]">
                  wants to connect with you
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => handleReview("rejected", request._id)}
                    className="rounded-full border border-[#EAE1D3] px-6 py-2 text-sm font-semibold text-[#8A8178] transition hover:bg-[#F3E9DC] cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleReview("accepted", request._id)}
                    className="rounded-full bg-[#E8624F] px-6 py-2 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544] cursor-pointer"
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}