import { ErrorHandler } from "@/components/error";
import { AppLayout } from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import { EventScrollFeed } from "@/features/tiktokFeed/Feed.tsx";
import { AdminPage, HomePage, LoginPage, Page404, ProfilePage, RegisterPage, SearchPage } from "@/pages";
import { ProtectedRoute } from "@/routes";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { EventPage } from "./pages/event/EventPage";

//ypp
const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<AppLayout />}>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/event/:id" element={<EventPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/feed/" element={<EventScrollFeed />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route path="*" element={<Page404 />} />
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
