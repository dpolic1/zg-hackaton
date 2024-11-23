import { Footer, Header } from "@/components/common";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="relative max-w-[2600px] mx-auto min-h-screen">
      <Header className="fixed left-0 top-0 right-0 w-full bg-background p-8" />

      <div className="pt-32 px-10 pb-10 bg-background">
        <main className="overflow-y-auto">
          <Outlet />
        </main>

        <Footer className="p-5 text-center" />
      </div>
    </div>
  );
}
