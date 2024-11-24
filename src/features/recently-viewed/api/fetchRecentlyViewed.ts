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
                title: "Muzej čokolade",
                url: "/event/1",
                imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
                type: "Event",
                date: "2021-08-01",
                location:
                {
                    lat: 45.8118122136567,
                    lng: 15.973228756191238,
                },
            },
            {
                id: "2",
                title: "Arheološki muzej u Zagrebu",
                url: "/event/2",
                imageUrl: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
                type: "Event",
                date: "2021-08-02",
                location:
                {
                    lat: 45.811097285387845,
                    lng: 15.97731388975867,
                },
            },
            {
                id: "3",
                title: "Orašar",
                url: "/event/3",
                imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
                type: "Event",
                date: "2021-08-03",
                location:
                {
                    lat: 45.80953904272471,
                    lng: 15.970095117395742,
                },
            },
            {
                id: "4",
                title: "Izložba Ivana Mažuranića",
                url: "/event/4",
                imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
                type: "Event",
                date: "2021-08-04",
                location:
                {
                    lat: 45.81508996819565,
                    lng: 15.974614612880355,
                },
            },
            {
                id: "5",
                title: "Izložba gmazova",
                url: "/event/5",
                imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
                type: "Event",
                date: "2021-08-04",
                location:
                {
                    lat: 45.81710919474261,
                    lng: 15.972305709927092,
                },
            }
        ];

        //setTimeout(() => resolve({ data }), 0);
        resolve({ data })
    });

    /* const response = await fetch(`${API_ENDPOINTS.ITEM.RECENTLY_VIEWED.GET_ALL}?${urlSearchParams}`, {
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        const res = await response.json();

        throw new Error(res.error)
    }

    const data = await response.json();

    return data; */
};