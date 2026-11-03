import { Loader2, FileText, Sparkles } from "lucide-react";

export default function AboutSection({
  isEditing,
  handleGenerateBio,
  isGenerating,
  isSaving,
  bioError,
  editProfile,
  setEditProfile,
  profile,
}) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-bold text-[#2B2A28]">
          <FileText className="h-4 w-4 text-[#5B8C6E]" />
          About
        </h3>

        {isEditing && (
          <button
            type="button"
            onClick={handleGenerateBio}
            disabled={isGenerating || isSaving}
            className="flex items-center gap-1.5 rounded-full border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-1.5 text-xs font-semibold text-[#5B8C6E] transition hover:bg-[#F3E9DC] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Writing your bio…
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                Write my bio
              </>
            )}
          </button>
        )}
      </div>

      {bioError && (
        <p className="mt-2 text-xs font-medium text-[#C4483D]">
          {bioError}
        </p>
      )}

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
  );
}