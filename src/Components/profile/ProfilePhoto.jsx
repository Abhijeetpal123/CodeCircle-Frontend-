import { Camera, Loader2, Trash2 } from "lucide-react";

export default function ProfilePhoto({
  profile,
  displayImageSrc,
  avatarColor,
  setIsPhotoOpen,
  handleFileSelect,
  uploadError,
  removeError,
  selectedFile,
  cancelPhotoSelection,
  uploading,
  handleProfilePhotoUpload,
  isRemoving,
  handleRemovePhoto,
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="group relative">
        {displayImageSrc ? (
          <button
            type="button"
            onClick={() => setIsPhotoOpen(true)}
            aria-label="View photo"
            className="block h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg transition duration-200 group-hover:ring-4 group-hover:ring-[#EAE1D3]"
          >
            <img
              src={displayImageSrc}
              alt={`${profile?.firstName} ${profile?.lastName}`}
              className="h-full w-full object-cover"
            />
          </button>
        ) : (
          <div
            className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white text-3xl font-bold text-white shadow-lg transition duration-200 group-hover:ring-4 group-hover:ring-[#EAE1D3]"
            style={{ backgroundColor: avatarColor }}
          >
            {profile?.firstName?.[0]}
            {profile?.lastName?.[0]}
          </div>
        )}

        <label
          aria-label="Change profile photo"
          className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-[3px] border-white bg-[#5B8C6E] text-white shadow-md transition-transform hover:scale-105 hover:bg-[#4A7359]"
        >
          <Camera className="h-4 w-4" />
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      </div>

      {(uploadError || removeError) && (
        <p className="mt-4 text-xs font-medium text-[#C4483D]">
          {uploadError || removeError}
        </p>
      )}

      {selectedFile ? (
        <div className="mt-5 flex items-center gap-2 rounded-full border border-[#EAE1D3] bg-[#FBF6EF] p-1.5 shadow-sm">
          <button
            onClick={cancelPhotoSelection}
            disabled={uploading}
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-[#8A8178] transition hover:bg-[#EAE1D3] hover:text-[#2B2A28] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleProfilePhotoUpload}
            disabled={uploading}
            className="flex items-center gap-1.5 rounded-full bg-[#E8624F] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#DA5544] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Uploading…
              </>
            ) : (
              "Save photo"
            )}
          </button>
        </div>
      ) : profile?.profilePic ? (
        <button
          onClick={handleRemovePhoto}
          disabled={isRemoving}
          className="mt-4 flex items-center gap-1.5 text-xs font-medium text-[#8A8178] transition hover:text-[#C4483D] disabled:opacity-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          {isRemoving ? "Removing..." : "Remove photo"}
        </button>
      ) : (
        <div className="h-8"></div> /* Spacer so layout doesn't jump */
      )}
    </div>
  );
}
