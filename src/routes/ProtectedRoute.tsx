import { useAuth } from "@/providers";
import { validateToken } from "@/utils/auth-utils";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      logout();
      return;
    }

    try {
      if (!validateToken(token).isValid) logout();
    } catch (error) {
      logout();
    }
  }, [location.pathname, logout]);

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location.pathname }} />;
};
