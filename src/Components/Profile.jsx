import { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader2,
  AlertCircle,
  GraduationCap,
  FileText,
  Sparkles,
  Trash2,
} from "lucide-react";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get("http://localhost:7777/profile/view", {
          withCredentials: true,
        });

        console.log(response.data);
        setProfile(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setLoadError(
          err.response?.data?.message ||
            err.response?.data ||
            "Couldn't load your profile.",
        );
      }
    };

    getProfile();
  }, []);

  const updateEducationField = (index, field, value) => {
    const updatedEducation = [...editProfile.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setEditProfile({ ...editProfile, education: updatedEducation });
  };

  const removeEducation = (index) => {
    const updatedEducation = editProfile.education.filter(
      (_, i) => i !== index,
    );
    setEditProfile({ ...editProfile, education: updatedEducation });
  };

  const handleSave = async () => {
    setSaveError(null);
    setIsSaving(true);
    try {
      const updatedData = {
        firstName: editProfile.firstName,
        lastName: editProfile.lastName,
        age: editProfile.age,
        about: editProfile.about,
        skills: (editProfile.skills || []).filter(Boolean),
        // strip the client-only "id" used for React keys before sending to the backend
        education: (editProfile.education || []).map(({ id, ...edu }) => edu),
      };

      console.log("Sending to API:", updatedData);

      await axios.patch("http://localhost:7777/profile/edit", updatedData, {
        withCredentials: true,
      });

      setProfile({ ...profile, ...updatedData });
      setIsEditing(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setSaveError(
        err.response?.data?.message ||
          err.response?.data ||
          "Couldn't save your changes. Try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EF]">
        <p
          className={`text-sm ${loadError ? "text-[#C4483D]" : "text-[#756F68]"}`}
        >
          {loadError || "Loading profile..."}
        </p>
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
          {saveError && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-2 rounded-xl border border-[#C4483D]/30 bg-[#C4483D]/10 px-3 py-2.5 text-sm text-[#C4483D]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{saveError}</span>
            </div>
          )}

          {/* Avatar */}
          <div
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white"
            style={{ backgroundColor: avatarColor }}
          >
            {profile.firstName?.[0]}
            {profile.lastName?.[0]}
          </div>

          {/* Name + age */}
          <div className="mt-5 text-center">
            {isEditing ? (
              <div className="grid grid-cols-2 gap-3 text-left">
                <label className="flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
                  First name
                  <input
                    type="text"
                    value={editProfile.firstName || ""}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        firstName: e.target.value,
                      })
                    }
                    disabled={isSaving}
                    className="rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
                  Last name
                  <input
                    type="text"
                    value={editProfile.lastName || ""}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        lastName: e.target.value,
                      })
                    }
                    disabled={isSaving}
                    className="rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                  />
                </label>
              </div>
            ) : (
              <h2 className="text-2xl font-bold text-[#2B2A28]">
                {profile.firstName} {profile.lastName}
              </h2>
            )}

            {isEditing ? (
              <input
                type="number"
                value={editProfile.age || ""}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, age: e.target.value })
                }
                disabled={isSaving}
                placeholder="Age"
                className="mt-3 w-32 rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-center text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
              />
            ) : (
              <p className="mt-1 text-sm text-[#756F68]">
                {profile.age ? `${profile.age} years old` : "Age not added yet"}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-[#EAE1D3]" />

          {/* About */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#2B2A28]">
              <FileText className="h-4 w-4 text-[#5B8C6E]" />
              About
            </h3>

            {isEditing ? (
              <textarea
                value={editProfile.about || ""}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, about: e.target.value })
                }
                disabled={isSaving}
                rows={4}
                placeholder="Tell people what you're building, your stack, or what you're looking for..."
                className="mt-3 w-full resize-none rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
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
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#2B2A28]">
              <Sparkles className="h-4 w-4 text-[#5B8C6E]" />
              Skills
            </h3>

            {isEditing ? (
              <>
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
                  disabled={isSaving}
                  className="mt-3 w-full rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                />
                <p className="mt-1.5 text-xs text-[#8A8178]">
                  Separate each skill with a comma.
                </p>
              </>
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

          {/* Divider */}
          <div className="my-8 border-t border-[#EAE1D3]" />

          {/* Education */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#2B2A28]">
              <GraduationCap className="h-4 w-4 text-[#5B8C6E]" />
              Education
            </h3>

            {isEditing ? (
              <div className="mt-4 space-y-4">
                {(editProfile.education || []).length === 0 && (
                  <p className="text-sm text-[#756F68]">
                    No education added yet.
                  </p>
                )}

                {(editProfile.education || []).map((edu, index) => (
                  <div
                    key={edu._id || edu.id || index}
                    className="relative rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] p-4"
                  >
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      disabled={isSaving}
                      aria-label="Remove this education entry"
                      className="absolute right-3 top-3 text-[#8A8178] transition hover:text-[#C4483D] disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-3 pr-6">
                      <label className="flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
                        Degree
                        <input
                          type="text"
                          placeholder="B.Tech"
                          value={edu.degree || ""}
                          onChange={(e) =>
                            updateEducationField(index, "degree", e.target.value)
                          }
                          disabled={isSaving}
                          className="rounded-lg border border-[#EAE1D3] bg-white px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
                        Field of study
                        <input
                          type="text"
                          placeholder="Computer Science"
                          value={edu.fieldOfStudy || ""}
                          onChange={(e) =>
                            updateEducationField(
                              index,
                              "fieldOfStudy",
                              e.target.value,
                            )
                          }
                          disabled={isSaving}
                          className="rounded-lg border border-[#EAE1D3] bg-white px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                        />
                      </label>
                    </div>

                    <label className="mt-3 flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
                      Institution
                      <input
                        type="text"
                        placeholder="XYZ University"
                        value={edu.institution || ""}
                        onChange={(e) =>
                          updateEducationField(
                            index,
                            "institution",
                            e.target.value,
                          )
                        }
                        disabled={isSaving}
                        className="rounded-lg border border-[#EAE1D3] bg-white px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                      />
                    </label>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <label className="flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
                        Start year
                        <input
                          type="text"
                          placeholder="2021"
                          value={edu.startYear || ""}
                          onChange={(e) =>
                            updateEducationField(
                              index,
                              "startYear",
                              e.target.value,
                            )
                          }
                          disabled={isSaving}
                          className="rounded-lg border border-[#EAE1D3] bg-white px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                        />
                      </label>
                      <label className="flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
                        End year
                        <input
                          type="text"
                          placeholder="2025 or Present"
                          value={edu.endYear || ""}
                          onChange={(e) =>
                            updateEducationField(
                              index,
                              "endYear",
                              e.target.value,
                            )
                          }
                          disabled={isSaving}
                          className="rounded-lg border border-[#EAE1D3] bg-white px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                        />
                      </label>
                    </div>

                    <label className="mt-3 flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
                      Description
                      <textarea
                        placeholder="Relevant coursework, activities, achievements..."
                        value={edu.description || ""}
                        onChange={(e) =>
                          updateEducationField(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        disabled={isSaving}
                        rows={2}
                        className="resize-none rounded-lg border border-[#EAE1D3] bg-white px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
                      />
                    </label>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setEditProfile({
                      ...editProfile,
                      education: [
                        ...(editProfile.education || []),
                        {
                          id: Date.now(),
                          institution: "",
                          degree: "",
                          fieldOfStudy: "",
                          startYear: "",
                          endYear: "",
                          description: "",
                        },
                      ],
                    })
                  }
                  disabled={isSaving}
                  className="w-full rounded-xl border-2 border-dashed border-[#EAE1D3] py-2.5 text-sm font-semibold text-[#8A8178] transition hover:border-[#5B8C6E] hover:text-[#5B8C6E] disabled:opacity-50"
                >
                  + Add education
                </button>
              </div>
            ) : profile.education?.length > 0 ? (
              <div className="mt-4 space-y-4">
                {profile.education.map((edu, index) => (
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
            ) : (
              <p className="mt-3 text-sm text-[#756F68]">
                No education added yet.
              </p>
            )}
          </section>

          {/* Edit / Save buttons */}
          {isEditing ? (
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSaveError(null);
                }}
                disabled={isSaving}
                className="flex-1 rounded-full border border-[#EAE1D3] px-6 py-2.5 text-sm font-semibold text-[#8A8178] transition hover:bg-[#F3E9DC] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E8624F] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsEditing(true);
                setEditProfile({ ...profile });
              }}
              className="mt-8 w-full rounded-full bg-[#E8624F] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544]"
            >
              Edit profile
            </button>
          )}
        </div>
      </div>
    </main>
  );
}