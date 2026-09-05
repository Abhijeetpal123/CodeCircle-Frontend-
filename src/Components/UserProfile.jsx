import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Sparkles, GraduationCap } from "lucide-react";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7777/user/${userId}`,
          {
            withCredentials: true,
          },
        );
        console.log(response.data);
        setUser(response.data.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError(
          err.response?.data?.message ||
            err.response?.data ||
            "Couldn't load this profile.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [userId]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EF]">
        <p className="text-sm text-[#756F68]">Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EF]">
        <p className="text-sm text-[#C4483D]">{error}</p>
      </main>
    );
  }

  if (!user) return null;

  const avatarColor = avatarColors[0];

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-[#E8624F]/10">
          {/* Avatar */}
          <div
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white"
            style={{ backgroundColor: avatarColor }}
          >
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </div>

          {/* Name + age */}
          <div className="mt-5 text-center">
            <h1 className="text-2xl font-bold text-[#2B2A28]">
              {user.firstName} {user.lastName}
            </h1>
            <p className="mt-1 text-sm text-[#756F68]">
              {user.age ? `${user.age} years old` : "Age not added yet"}
            </p>
          </div>

          <div className="my-8 border-t border-[#EAE1D3]" />

          {/* About */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#2B2A28]">
              <FileText className="h-4 w-4 text-[#5B8C6E]" />
              About
            </h3>
            <p className="mt-1 text-sm text-[#756F68]">
              {user.about ||
                "This developer hasn't added an About section yet."}
            </p>
          </section>

          <div className="my-8 border-t border-[#EAE1D3]" />

          {/* Skills */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#2B2A28]">
              <Sparkles className="h-4 w-4 text-[#5B8C6E]" />
              Skills
            </h3>
            {user.skills?.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#F3E9DC] px-3 py-1.5 text-sm font-medium text-[#5B8C6E]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-[#756F68]">
                No skills added yet.
              </p>
            )}
          </section>

          {/* Education, only shown if the profile actually has any */}
          {user.education?.length > 0 && (
            <>
              <div className="my-8 border-t border-[#EAE1D3]" />
              <section>
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#2B2A28]">
                  <GraduationCap className="h-4 w-4 text-[#5B8C6E]" />
                  Education
                </h3>
                <div className="mt-4 space-y-4">
                  {user.education.map((edu, index) => (
                    <div
                      key={edu._id || index}
                      className="border-l-2 border-[#E8624F]/30 pl-4"
                    >
                      <h4 className="font-bold text-[#2B2A28]">
                        {edu.degree}
                        {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                      </h4>
                      {edu.institution && (
                        <p className="text-sm font-medium text-[#5B8C6E]">
                          {edu.institution}
                        </p>
                      )}
                      {(edu.startYear || edu.endYear) && (
                        <p className="text-xs text-[#8A8178]">
                          {edu.startYear || "—"} – {edu.endYear || "Present"}
                        </p>
                      )}
                      {edu.description && (
                        <p className="mt-1 text-sm text-[#756F68]">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}