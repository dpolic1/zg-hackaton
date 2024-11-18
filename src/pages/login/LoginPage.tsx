import { LoginForm } from "@/features/login";
import { useAuth } from "@/providers";
import { Navigate, useLocation } from "react-router-dom";

export function LoginPage() {
  // hooks
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const from = location.state?.from || "/";

  if (isAuthenticated) return <Navigate to={from} replace />;

  return (
    <div className="grid place-items-center min-h-screen">
      <LoginForm />
    </div>
  );
}
