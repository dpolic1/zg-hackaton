import { GridView } from "@/components/elements";
import { RecentlyViewedSkeleton } from "@/components/loaders";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { RefreshCwIcon } from "lucide-react";
import { memo } from "react";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { RecentlyViewedGrid } from "./RecentlyViewedList";

const RecentlyViewed = memo(function RecentlyViewed() {
  // hooks
  const { user } = useAuth();
  const { data, isLoading, refetch } = useRecentlyViewed({ userId: user?.id ?? "1" });

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-slate-200 text-4xl pb-2 font-bold">Recently Viewed</h2>

        <Button size={"icon"} onClick={refetch} variant="ghost" className="rounded-full">
          <RefreshCwIcon size={24} />
        </Button>
      </div>

      {isLoading && (
        <GridView>
          {Array.from({ length: 4 }).map((_, index) => (
            <RecentlyViewedSkeleton key={index} />
          ))}
        </GridView>
      )}

      {!isLoading && !data.length && <p>No data found</p>}

      {!isLoading && data.length && <RecentlyViewedGrid data={data} />}
    </section>
  );
});

export { RecentlyViewed };
