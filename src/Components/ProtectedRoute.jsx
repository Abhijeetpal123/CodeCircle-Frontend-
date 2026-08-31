import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:7777/profile/view", {
          withCredentials: true,
        });

        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        console.error(err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // API is still checking
  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  // User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in
  return children;
}