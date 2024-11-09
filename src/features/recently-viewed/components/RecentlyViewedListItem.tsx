import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { TRecentlyViewed } from "../types/recently-viewed-types";

type TRecentlyViewedListItemProps = {
  item: TRecentlyViewed;
  className?: string;
};

export function RecentlyViewedListItem({ item, className }: TRecentlyViewedListItemProps) {
  return (
    <li className={cn(className, "")}>
      <Link to={item.url}>
        <img src={item.imageUrl} alt={item.title} />
        <h3>{item.title}</h3>
        <p>{item.type}</p>
      </Link>
    </li>
  );
}
