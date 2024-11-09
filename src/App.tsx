import { ErrorHandler } from "@/components/error";
import { MainLayout } from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import { AdminPage, HomePage, LoginPage, Page404 } from "@/pages";
import { AuthProvider } from "@/providers";
import { ProtectedRoute } from "@/routes";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<MainLayout />} errorElement={<Page404 />}>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Route>,
  ])
);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <ErrorHandler />
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
