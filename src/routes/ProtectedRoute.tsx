import { useAuth } from "@/providers";
import { validateToken } from "@/utils/auth-utils";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("jwtToken");

      try {
        if (!validateToken(token).isValid) {
          throw new Error("Invalid token");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }

        await logout();
      }
    };

    checkAuth();
  }, [location.pathname, logout]);

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location.pathname }} />;
};
