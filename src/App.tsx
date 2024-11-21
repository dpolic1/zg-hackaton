import { ErrorHandler } from "@/components/error";
import { AppLayout } from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import { AdminPage, HomePage, LoginPage, Page404, RegisterPage } from "@/pages";
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
    <Route path="/" element={<AppLayout />} errorElement={<Page404 />}>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Route>,
  ])
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ErrorHandler />
      <Toaster />
    </>
  );
}

export default App;
