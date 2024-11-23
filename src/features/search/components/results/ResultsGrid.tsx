import { GridView } from "@/components/elements";
import { TEvent } from "../../types";
import { EventCard } from "@/features/events-grid/EventCard";
import { cn } from "@/lib/utils";

type TResultsGridProps = {
  className?: string;
  events: TEvent[];
};

export function ResultsGrid({ className, events }: TResultsGridProps) {
  return (
    <GridView className={cn(className, "list-none")}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </GridView>
  );
}
