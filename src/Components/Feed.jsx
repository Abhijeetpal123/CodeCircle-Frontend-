import { useState, useEffect } from "react";
import axios from "axios";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function Feed() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7777/user/feed?page=1&limit=10",
          { withCredentials: true },
        );

        console.log(response.data);
        setUsers(response.data.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    getFeed();
  }, []);

  const handleRequest = async (status, toUserId) => {
    try {
      await axios.post(
        `http://localhost:7777/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true },
      );

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user._id !== toUserId),
      );
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-10">
      <div className="mx-auto mb-10 max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#2B2A28]">
          Discover Developers
        </h1>
        <p className="mt-2 text-sm text-[#756F68]">
          Find people to connect and collaborate with.
        </p>
      </div>

      {users.length === 0 ? (
        <p className="text-center text-sm text-[#8A8178]">
          You're all caught up — no new developers to show right now.
        </p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user, i) => (
            <div
              key={user._id}
              className="flex flex-col rounded-3xl bg-white p-8 text-center shadow-xl shadow-[#E8624F]/10 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{
                  backgroundColor: avatarColors[i % avatarColors.length],
                }}
              >
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </div>

              <h3 className="text-lg font-bold text-[#2B2A28]">
                {user.firstName} {user.lastName}
              </h3>
              <p className="mt-1 text-sm text-[#8A8178]">
                {user.age ? `${user.age} years old` : "Age not added yet"}
              </p>
              <p className="mt-3 line-clamp-3 text-sm text-[#756F68]">
                {user.about || "This developer hasn't added an About yet."}
              </p>

              {(user.skills || []).length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#F3E9DC] px-2.5 py-1 text-xs font-medium text-[#5B8C6E]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => handleRequest("ignored", user._id)}
                  className="rounded-full border border-[#EAE1D3] px-6 py-2 text-sm font-semibold text-[#8A8178] transition hover:bg-[#F3E9DC] cursor-pointer"
                >
                  Ignore
                </button>
                <button
                  onClick={() => handleRequest("interested", user._id)}
                  className="rounded-full bg-[#E8624F] px-6 py-2 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544] cursor-pointer"
                >
                  Interested
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}