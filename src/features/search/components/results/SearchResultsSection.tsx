import { GridView } from "@/components/elements";
import { useSearchEvents } from "../../hooks/useSearchEvents";
import { RecentlyViewedSkeleton } from "@/components/loaders";
import { ResultsGrid } from "./ResultsGrid";

export function SearchResultsSection() {
  const { data: events, isLoading, refetch: refetchEvents } = useSearchEvents();

  return (
    <section>
      {isLoading && (
        <GridView>
          {Array.from({ length: 4 }).map((_, index) => (
            <RecentlyViewedSkeleton key={index} />
          ))}
        </GridView>
      )}

      {!isLoading && !events.length && <p>No data found</p>}

      {!isLoading && events.length && <ResultsGrid events={events} />}
    </section>
  );
}
