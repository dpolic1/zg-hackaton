import { useAuth } from "@/providers/auth-provider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    /* if (!user) {
      navigate("/login", { replace: true });
    } */
  }, [user, navigate]);

  return true ? children : null;
};
