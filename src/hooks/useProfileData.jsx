import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const useProfileData = () => {
  const [profile, setProfile] = useState(null);
  const [loadError, setLoadError] = useState(null);

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
            "Couldn't load your profile."
        );
      }
    };

    getProfile();
  }, []);

  return { profile, setProfile, loadError };
};

export default useProfileData;