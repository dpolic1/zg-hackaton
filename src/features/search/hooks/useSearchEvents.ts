import { observableError } from "@/utils";
import { useEffect, useState } from "react";
import { fetchSearchedEvents } from "../api/fetchSearchedEvents";
import { TEvent } from "../types";
import { useLocation } from "react-router-dom";

export function useSearchEvents() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const getSearchedEvents = async () => {
      setIsLoading(true);

      try {
        const urlSearchParams = new URLSearchParams(location.search);
        const { data } = await fetchSearchedEvents({ urlSearchParams });

        setEvents(data);
      } catch (error) {
        if (error instanceof Error) {
          observableError.notify({
            title: "Failed to fetch searched events",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    getSearchedEvents();
  }, [refetchIndex]);

  const refetch = () => setRefetchIndex((prev) => prev + 1);

  return { data: events, isLoading, refetch };
}
