import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ProfilePhoto from "./profile/ProfilePhoto";
import { Loader2, AlertCircle } from "lucide-react";
import PhotoLightbox from "./profile/PhotoLightbox";
import AboutSection from "./profile/AboutSection";
import SkillsSection from "./profile/SkillSection";
import EducationSection from "./profile/EducationSection";
import PersonalInfo  from "./profile/PersonalInfo";
const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];
const MAX_FILE_SIZE_MB = 5;

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeError, setRemoveError] = useState(null);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [bioError, setBioError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/view`, {
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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isPhotoOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsPhotoOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isPhotoOpen]);

  const updateEducationField = (index, field, value) => {
    const updatedEducation = [...(editProfile.education || [])];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setEditProfile({ ...editProfile, education: updatedEducation });
  };

  const removeEducation = (index) => {
    const updatedEducation = (editProfile.education || []).filter(
      (_, i) => i !== index,
    );
    setEditProfile({ ...editProfile, education: updatedEducation });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setUploadError(`Image must be under ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setUploadError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const cancelPhotoSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
  };

  const handleProfilePhotoUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    setUploadError(null);
    setUploading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/photo`,
        formData,
        {
          withCredentials: true,
        },
      );

      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePic: response.data.profilePic,
      }));

      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setUploadError(
        err.response?.data?.message ||
          err.response?.data ||
          "Couldn't upload your photo. Try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    const confirmRemove = window.confirm("Remove your profile photo?");
    if (!confirmRemove) return;

    setRemoveError(null);
    setIsRemoving(true);
    try {
      await axios.delete(`${BASE_URL}/profile/photo`, {
        withCredentials: true,
      });
      setProfile((prev) => ({ ...prev, profilePic: null }));
    } catch (err) {
      console.error(err.response?.data || err.message);
      setRemoveError(
        err.response?.data?.message ||
          err.response?.data ||
          "Couldn't remove your photo.",
      );
    } finally {
      setIsRemoving(false);
    }
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
        education: (editProfile.education || []).map(({ ...edu }) => edu),
      };

      console.log("Sending to API:", updatedData);

      await axios.patch(`${BASE_URL}/profile/edit`, updatedData, {
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

  const handleGenerateBio = async () => {
    if (!profile.skills || profile.skills.length === 0) {
      setBioError("Add your skills and save your profile first");
      return;
    }
    setBioError(null);
    setIsGenerating(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/ai/bio`,
        {},
        {
          withCredentials: true,
        },
      );
      setEditProfile((prev) => ({ ...prev, about: res.data.bio }));
    } catch (err) {
      console.error(err.response?.data || err.message);
      setBioError(
        err.response?.data?.message || "Couldn't generate bio. Try again.",
      );
    } finally {
      setIsGenerating(false);
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
  const displayImageSrc =
    previewUrl ||
    (profile?.profilePic ? `${BASE_URL}${profile.profilePic}` : null);
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
          <ProfilePhoto
            profile={profile}
            displayImageSrc={displayImageSrc}
            avatarColor={avatarColor}
            setIsPhotoOpen={setIsPhotoOpen}
            handleFileSelect={handleFileSelect}
            uploadError={uploadError}
            removeError={removeError}
            selectedFile={selectedFile}
            cancelPhotoSelection={cancelPhotoSelection}
            uploading={uploading}
            handleProfilePhotoUpload={handleProfilePhotoUpload}
            isRemoving={isRemoving}
            handleRemovePhoto={handleRemovePhoto}
          />
          {/* Name + age */}
          <PersonalInfo
  isEditing={isEditing}
  editProfile={editProfile}
  setEditProfile={setEditProfile}
  isSaving={isSaving}
  profile={profile}
/>
          {/* Divider */}
          <div className="my-8 border-t border-[#EAE1D3]" />

          <AboutSection
            isEditing={isEditing}
            handleGenerateBio={handleGenerateBio}
            isGenerating={isGenerating}
            isSaving={isSaving}
            bioError={bioError}
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            profile={profile}
          />

          {/* Divider */}
          <div className="my-8 border-t border-[#EAE1D3]" />

          <SkillsSection
            isEditing={isEditing}
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            isSaving={isSaving}
            profile={profile}
          />

          {/* Divider */}
          <div className="my-8 border-t border-[#EAE1D3]" />

          {/* Education */}
          <EducationSection
            isEditing={isEditing}
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            isSaving={isSaving}
            profile={profile}
            updateEducationField={updateEducationField}
            removeEducation={removeEducation}
          />

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
                // BUG FIX: Ensure arrays exist when entering edit mode
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
        </div>
      </div>
      <PhotoLightbox
        isPhotoOpen={isPhotoOpen}
        displayImageSrc={displayImageSrc}
        setIsPhotoOpen={setIsPhotoOpen}
        profile={profile}
      />
    </main>
  );
}
