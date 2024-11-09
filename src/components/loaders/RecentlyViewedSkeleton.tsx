import { Skeleton } from "@/components/ui/skeleton";

export function RecentlyViewedSkeleton() {
  return (
    <Skeleton className="flex flex-col gap-3 p-5 rounded-lg">
      <Skeleton className="w-full h-20 rounded-lg" />
      <Skeleton className="w-full h-12 rounded-lg" />
      <Skeleton className="w-1/3 h-8 rounded-lg" />
    </Skeleton>
  );
}
