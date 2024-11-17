import { AuthProvider } from "@/providers";
import { MainLayout } from "./MainLayout";

export function AppLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
