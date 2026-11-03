import { Loader2 } from "lucide-react";

const ProfileActions = ({
  isEditing,
  setIsEditing,
  isSaving,
  handleSave,
  setSaveError,
  profile,
  setEditProfile,
}) => {
  return (
    <>
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
            setEditProfile({
              ...profile,
              education: profile.education || [],
              skills: profile.skills || [],
            });
          }}
          className="mt-8 w-full rounded-full bg-[#E8624F] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#E8624F]/30 transition hover:bg-[#DA5544]"
        >
          Edit profile
        </button>
      )}
    </>
  );
};

export default ProfileActions;

