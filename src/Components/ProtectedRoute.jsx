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
  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#FBF6EF] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#EAE1D3] border-t-[#5B8C6E]" />
        <p className="text-sm font-medium text-[#8A8178]">
          Loading...
        </p>
      </div>
    </div>
  );
}

  // User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in
  return children;
}