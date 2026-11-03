import { GraduationCap, Trash2 } from "lucide-react";

const EducationSection = ({
  isEditing,
  editProfile,
  setEditProfile,
  isSaving,
  profile,
  updateEducationField,
  removeEducation,
}) => {
  return (
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
                      updateEducationField(index, "fieldOfStudy", e.target.value)
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
                    updateEducationField(index, "institution", e.target.value)
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
                      updateEducationField(index, "startYear", e.target.value)
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
                      updateEducationField(index, "endYear", e.target.value)
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
                    updateEducationField(index, "description", e.target.value)
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
  );
};

export default EducationSection;