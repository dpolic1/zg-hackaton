import { Loader2Icon } from "lucide-react";

export function AppSkeleton() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-slate-700">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-xl font-medium">Loading the app...</p>
        <Loader2Icon size={48} className="animate-spin duration-300" />
      </div>
    </div>
  );
}
