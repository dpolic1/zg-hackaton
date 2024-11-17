import { useAuth } from "@/providers";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // hooks
  const { isAuthenticated, initAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      const currPathname = location.pathname;
      initAuth(currPathname);
    }
  }, [isAuthenticated, initAuth, location.pathname]);

  return isAuthenticated ? children : null;
};
