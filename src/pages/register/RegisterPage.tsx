import { RegisterForm } from "@/features/register";
import { useAuth } from "@/providers";
import { Navigate, useLocation } from "react-router-dom";

export function RegisterPage() {
  // hooks
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const from = location.state?.from || "/";

  if (isAuthenticated) return <Navigate to={from} replace />;

  return (
    <div className="grid place-items-center min-h-screen">
      <RegisterForm />
    </div>
  );
}
