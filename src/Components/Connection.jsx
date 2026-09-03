import { useEffect, useState } from "react";
import axios from "axios";
const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function Connection() {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getConnections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7777/user/connections",
          {
            withCredentials: true,
          },
        );
        console.log(response.data);
        setConnections(response.data.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError(
          err.response?.data?.message ||
            err.response?.data ||
            "Couldn't load your connections.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    getConnections();
  }, []);

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-10">
      <div className="mx-auto mb-10 max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#2B2A28]">Your Connections</h1>
        <p className="mt-2 text-sm text-[#756F68]">
          People you've connected with
        </p>
      </div>

      {isLoading ? (
        <p className="text-center text-sm text-[#8A8178]">
          Loading your connections…
        </p>
      ) : error ? (
        <p className="mx-auto max-w-md text-center text-sm text-[#C4483D]">
          {error}
        </p>
      ) : connections.length === 0 ? (
        <p className="text-center text-sm text-[#8A8178]">
          No connections yet — go say hi to someone in Discover.
        </p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {connections.map((connection, i) => {
            const color = avatarColors[i % avatarColors.length];

            return (
              <div
                key={connection._id}
                className="flex flex-col rounded-3xl bg-white p-8 text-center shadow-xl shadow-[#E8624F]/10 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 0 6px ${color}26`,
                  }}
                >
                  {connection.firstName?.[0]}
                  {connection.lastName?.[0]}
                </div>

                <h3 className="text-lg font-bold text-[#2B2A28]">
                  {connection.firstName} {connection.lastName}
                </h3>
                <p className="mt-3 text-sm text-[#756F68]">
                  {connection.about || "This developer hasn't added About yet"}
                </p>
               {(connection.skills || []).length > 0 && (
  <div className="mt-4 flex flex-wrap justify-center gap-1.5">
    {connection.skills.map((skill) => (
      <span
        key={skill}
        className="rounded-full bg-[#F3E9DC] px-2.5 py-1 text-xs font-medium text-[#5B8C6E]"
      >
        {skill}
      </span>
    ))}
  </div>
)}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
