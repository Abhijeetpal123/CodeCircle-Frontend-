import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const MAX_FILE_SIZE_MB = 5;

const useProfilePhoto = (profile, setProfile) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeError, setRemoveError] = useState(null);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Select and validate photo
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

  // Cancel photo selection
  const cancelPhotoSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
  };

  // Upload profile photo
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
        }
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
          "Couldn't upload your photo. Try again."
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
        "Couldn't remove your photo."
    );
  } finally {
    setIsRemoving(false);
  }
};

  return {
    selectedFile,
    setSelectedFile,
    previewUrl,
    setPreviewUrl,
    uploading,
    setUploading,
    uploadError,
    setUploadError,
    isRemoving,
    setIsRemoving,
    removeError,
    setRemoveError,
    handleFileSelect,
    cancelPhotoSelection,
    handleProfilePhotoUpload,
    handleRemovePhoto,
  };
};

export default useProfilePhoto;