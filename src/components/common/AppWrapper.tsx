import { Footer, Header } from "@/components/common";
import { Outlet } from "react-router-dom";

export function AppWrapper() {
  return (
    <div className="relative max-w-[2600px] mx-auto min-h-screen">
      <Header className="fixed left-0 top-0 right-0 p-8" />

      <div className="pl-80 py-10 pr-8 bg-slate-600 min-h-screen">
        <main className="overflow-y-auto">
          <Outlet />
        </main>

        <Footer className="p-5 text-center" />
      </div>
    </div>
  );
}
