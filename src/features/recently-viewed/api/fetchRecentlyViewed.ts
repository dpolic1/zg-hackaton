import { API_ENDPOINTS } from "@/constants";
import { TRecentlyViewed } from "../types/recently-viewed-types";

type TFetchRecentlyViewedProps = {
    userId: string;
};

export async function fetchRecentlyViewed({ userId }: TFetchRecentlyViewedProps): Promise<{ data: TRecentlyViewed[] }> {
    const urlSearchParams = new URLSearchParams({ userId });

    return new Promise((resolve) => {
        const data: TRecentlyViewed[] = [
            {
                id: "1",
                title: "The Great Gatsby",
                url: "/event/1",
                imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
                type: "Book",
                date: "2021-08-01",
                location :
                {
                    lat: 45.815, 
                    lng: 15.9819,
                },
            },
            {
                id: "2",
                title: "The Catcher in the Rye",
                url: "/event/2",
                imageUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
                type: "Book",
                date: "2021-08-02",
                location :
                {
                    lat: 45.81, 
                    lng: 15.98,
                },
            },
            {
                id: "3",
                title: "To Kill a Mockingbird",
                url: "/event/3",
                imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
                type: "Book",
                date: "2021-08-03",
                location :
                {
                    lat: 45.82, 
                    lng: 15.985,
                },
            },
            {
                id: "4",
                title: "1984",
                url: "/books/4",
                imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
                type: "Book",
                date: "2021-08-04",
                location :
                {
                    lat: 45.79, 
                    lng: 15.984,
                },
            }
        ];

        //setTimeout(() => resolve({ data }), 0);
        resolve({ data })
    });

    const response = await fetch(`${API_ENDPOINTS.ITEM.RECENTLY_VIEWED.GET_ALL}?${urlSearchParams}`, {
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        const res = await response.json();

        throw new Error(res.error)
    }

    const data = await response.json();

    return data;
};