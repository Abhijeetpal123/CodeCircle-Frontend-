import { X } from "lucide-react";

export default function PhotoLightbox({
  isPhotoOpen,
  displayImageSrc,
  setIsPhotoOpen,
  profile,
}) {
  if (!isPhotoOpen || !displayImageSrc) return null;

  return (
    <div
      onClick={() => setIsPhotoOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2A28]/90 p-4"
    >
      <button
        onClick={() => setIsPhotoOpen(false)}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        <X className="h-6 w-6" />
      </button>

      <img
        src={displayImageSrc}
        alt={`${profile?.firstName} ${profile?.lastName}`}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
      />
    </div>
  );
}
