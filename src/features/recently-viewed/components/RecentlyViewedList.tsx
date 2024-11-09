import { GridView } from "@/components/elements/grid";
import { TRecentlyViewed } from "../types/recently-viewed-types";
import { RecentlyViewedListItem } from "./RecentlyViewedListItem";

type TRecentlyViewedListProps = {
  data: TRecentlyViewed[];
};

export function RecentlyViewedGrid({ data }: TRecentlyViewedListProps) {
  return (
    <GridView className="list-none">
      {data.map((item) => (
        <RecentlyViewedListItem key={item.id} item={item} className="rounded-lg overflow-hidden" />
      ))}
    </GridView>
  );
}
