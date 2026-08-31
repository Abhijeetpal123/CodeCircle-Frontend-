import { useEffect, useState } from "react";
import axios from "axios";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get("http://localhost:7777/profile/view", {
          withCredentials: true,
        });

        console.log(response.data);

        setProfile(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getProfile();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const updatedData = {
        firstName: editProfile.firstName,
        lastName: editProfile.lastName,
        age: editProfile.age,
        about: editProfile.about,
        skills: editProfile.skills,
      };

      console.log("Sending to API:", updatedData);

      await axios.patch("http://localhost:7777/profile/edit", updatedData, {
        withCredentials: true,
      });

      setProfile({ ...profile, ...updatedData });
      setIsEditing(false);
      setIsSaving(false);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EF]">
        <p className="text-sm text-[#756F68]">Loading profile...</p>
      </main>
    );
  }

  const avatarColor = avatarColors[0];

  return (
    <main className="min-h-screen bg-[#FBF6EF] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Page heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#2B2A28]">My Profile</h1>

          <p className="mt-2 text-sm text-[#756F68]">
            Manage your developer profile
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-[#E8624F]/10">
          {/* Avatar */}
          <div
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white"
            style={{
              backgroundColor: avatarColor,
            }}
          >
            {profile.firstName?.[0]}
            {profile.lastName?.[0]}
          </div>

          {/* Name */}
          <div className="mt-5 text-center">
            {isEditing ? (
              <h2>
                <input
                  type="text"
                  value={editProfile.firstName || ""}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      firstName: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={editProfile.lastName || ""}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      lastName: e.target.value,
                    })
                  }
                />
              </h2>
            ) : (
              <h2 className="text-2xl font-bold text-[#2B2A28]">
                {profile.firstName} {profile.lastName}
              </h2>
            )}

            {isEditing ? (
              <p>
                <input
                  type="number"
                  value={editProfile.age || ""}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      age: e.target.value,
                    })
                  }
                  placeholder="Age"
                  className="mt-2 w-32 rounded-lg border border-[#EAE1D3] bg-white px-3 py-2 text-center text-sm outline-none focus:border-[#E8624F]"
                />
              </p>
            ) : (
              <h2>
                <p className="mt-1 text-sm text-[#756F68]">
                  {profile.age
                    ? `${profile.age} years old`
                    : "Age not added yet"}
                </p>
              </h2>
            )}
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-[#EAE1D3]" />

          {/* About */}
          <section>
            <h3 className="text-lg font-bold text-[#2B2A28]">About</h3>

            {isEditing ? (
              <textarea
                value={editProfile.about || ""}
                onChange={(e) =>
                  setEditProfile({
                    ...editProfile,
                    about: e.target.value,
                  })
                }
              />
            ) : (
              <p className="mt-1 text-sm text-[#756F68]">
                {profile.about ||
                  "This developer hasn't added an About section yet."}
              </p>
            )}
          </section>

          {/* Divider */}
          <div className="my-8 border-t border-[#EAE1D3]" />

          {/* Skills */}
          <section>
            <h3 className="text-lg font-bold text-[#2B2A28]">Skills</h3>

            {isEditing ? (
              <input
                type="text"
                value={editProfile.skills?.join(", ") || ""}
                placeholder="React, JavaScript, Node.js"
                onChange={(e) =>
                  setEditProfile({
                    ...editProfile,
                    skills: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  })
                }
                className="mt-4 w-full rounded-lg border border-[#EAE1D3] bg-white px-4 py-3 text-sm outline-none focus:border-[#E8624F]"
              />
            ) : profile.skills?.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
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

          {/* Edit Button */}
          {isEditing ? (
            <div className="mt-8 flex gap-3">
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              <button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsEditing(true);
                setEditProfile({ ...profile });
              }}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
