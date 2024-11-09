import { observableError } from "@/utils";
import { useEffect, useState } from "react";
import { fetchRecentlyViewed } from "../api/fetchRecentlyViewed";
import { TRecentlyViewed } from "../types/recently-viewed-types";

type TUseRecentlyViewedProps = {
    userId?: string;
};

export function useRecentlyViewed({ userId }: TUseRecentlyViewedProps) {
    const [recentlyViewed, setRecentlyViewed] = useState<TRecentlyViewed[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refetchIndex, setRefetchIndex] = useState(0);

    useEffect(() => {
        if (!userId) return;

        const getClassroomResources = async () => {
            setIsLoading(true);

            const requestData = { userId };

            try {
                const { data } = await fetchRecentlyViewed(requestData);

                setRecentlyViewed(data);
            } catch (error) {
                if (error instanceof Error) {
                    observableError.notify({ title: "Failed to fetch recently viewed items", description: error.message });
                }
            } finally {
                setIsLoading(false);
            }
        };

        getClassroomResources();
    }, [userId, refetchIndex]);

    const refetch = () => setRefetchIndex((prev) => prev + 1);

    return { data: recentlyViewed, isLoading, refetch };
}
