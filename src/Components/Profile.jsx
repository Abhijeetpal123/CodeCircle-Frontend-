import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { AlertCircle } from "lucide-react";

import ProfilePhoto from "./profile/ProfilePhoto";
import PhotoLightbox from "./profile/PhotoLightbox";
import AboutSection from "./profile/AboutSection";
import SkillsSection from "./profile/SkillSection";
import EducationSection from "./profile/EducationSection";
import PersonalInfo from "./profile/PersonalInfo";
import ProfileActions from "./profile/ProfileActions";

import useProfileData from "../hooks/useProfileData";
import useProfilePhoto from "../hooks/useProfilePhoto";

const avatarColors = ["#5B8C6E", "#E8624F", "#E8A94C"];

export default function Profile() {
  // Profile data hook
  const { profile, setProfile, loadError } = useProfileData();

  // Profile photo hook
  const {
    selectedFile,
    previewUrl,
    uploading,
    uploadError,
    isRemoving,
    removeError,
    handleFileSelect,
    cancelPhotoSelection,
    handleProfilePhotoUpload,
    handleRemovePhoto,
  } = useProfilePhoto(profile, setProfile);

  // Profile editing states
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Photo lightbox state
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  // AI bio states
  const [isGenerating, setIsGenerating] = useState(false);
  const [bioError, setBioError] = useState(null);

  // Handle photo lightbox keyboard events
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

  // Update education field
  const updateEducationField = (index, field, value) => {
    const updatedEducation = [...(editProfile.education || [])];

    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };

    setEditProfile({
      ...editProfile,
      education: updatedEducation,
    });
  };

  // Remove education
  const removeEducation = (index) => {
    const updatedEducation = (editProfile.education || []).filter(
      (_, i) => i !== index,
    );

    setEditProfile({
      ...editProfile,
      education: updatedEducation,
    });
  };

  // Save profile
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

  // Generate AI bio
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

      setEditProfile((prev) => ({
        ...prev,
        about: res.data.bio,
      }));
    } catch (err) {
      console.error(err.response?.data || err.message);

      setBioError(
        err.response?.data?.message || "Couldn't generate bio. Try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Loading state
  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EF]">
        <p
          className={`text-sm ${
            loadError ? "text-[#C4483D]" : "text-[#756F68]"
          }`}
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
          <ProfileActions
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSaving={isSaving}
            handleSave={handleSave}
            setSaveError={setSaveError}
            profile={profile}
            setEditProfile={setEditProfile}
          />
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
