import { Sparkles } from "lucide-react";

const SkillsSection = ({
  isEditing,
  editProfile,
  setEditProfile,
  isSaving,
  profile,
}) => {
  return (
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
  );
};

export default SkillsSection;