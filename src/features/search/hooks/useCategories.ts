import { observableError } from "@/utils";
import { useEffect, useState } from "react";
import { TCategoryFilterItem } from "../types";
import { fetchCategories } from "../api/fetchCategories";

export function useCategories() {
  const [categories, setCategories] = useState<TCategoryFilterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchIndex, setRefetchIndex] = useState(0);

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);

      try {
        const data = await fetchCategories();

        setCategories(data);
      } catch (error) {
        if (error instanceof Error) {
          observableError.notify({
            title: "Failed to fetch event categories",
            description: error.message,
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, [refetchIndex]);

  const refetch = () => setRefetchIndex((prev) => prev + 1);

  return { data: categories, isLoading, refetch };
}
