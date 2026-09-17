import { useEffect, useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="mx-auto grid max-w-5xl items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {connections.map((connection, i) => {
            const color = avatarColors[i % avatarColors.length];
            const skills = connection.skills || [];
            const visibleSkills = skills.slice(0, 4);
            const extraSkillsCount = skills.length - visibleSkills.length;

            return (
              <div
                key={connection._id}
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
                    {connection.firstName?.[0]}
                    {connection.lastName?.[0]}
                  </div>
                  <span
                    className="absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#5B8C6E] text-white"
                    title="Connected"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                </div>

                {/* =================================
                    USER NAME
                ================================= */}
                <h3 className="flex items-center justify-center text-base font-bold text-[#2B2A28]">
                  {connection.firstName} {connection.lastName}
                </h3>

                {/* =================================
                    STATUS 
                ================================= */}
                <p className="mt-0.5 flex items-center justify-center text-[11px] font-semibold uppercase tracking-wide text-[#5B8C6E]">
                  Connected
                </p>

                {/* =================================
                    ABOUT (Fixed min-height)
                ================================= */}
                <p className="mt-3 min-h-[40px] text-[13px] leading-5 text-[#756F68] line-clamp-2">
                  {connection.about ||
                    "This developer hasn't added an About yet."}
                </p>

                {/* =================================
                    SKILLS (Fixed min-height)
                ================================= */}
                <div className="mt-3 min-h-[28px]">
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
                    mt-auto pins button to the bottom
                ================================= */}
                <div className="mt-auto flex flex-col pt-5">
                  <Link to={"/chat/" + connection._id} className="w-full">
                    <button className="
                      w-full
                      cursor-pointer
                      rounded-full
                      bg-[#5B8C6E]
                      px-5
                      py-2
                      text-[13px]
                      font-semibold
                      text-white
                      shadow-sm
                      shadow-[#5B8C6E]/20
                      transition
                      hover:bg-[#4A7359]
                    ">
                      Message
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}