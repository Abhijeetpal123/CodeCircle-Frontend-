import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function useNavbarAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });

        if (isMounted) {
          setIsLoggedIn(true);
        }
      } catch {
        if (isMounted) {
          setIsLoggedIn(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  const handleLogOut = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );

      setIsLoggedIn(false);
      navigate("/", { replace: true });

      return true;
    } catch (err) {
      console.error(
        "LOGOUT FAILED:",
        err.response?.data || err.message
      );

      return false;
    }
  };

  return { isLoggedIn, handleLogOut };
}