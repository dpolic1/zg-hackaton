import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { TRecentlyViewed } from "../types/recently-viewed-types";

type TRecentlyViewedListItemProps = {
  item: TRecentlyViewed;
  className?: string;
};

export function RecentlyViewedListItem({ item, className }: TRecentlyViewedListItemProps) {
  const navigate = useNavigate();

  return (
    <li className={cn(className, "")}>
      <Button
        onClick={() => {
          console.log(item);
          navigate(`/event/${item.id}`, { state: item });
        }}
      >
        <img src={item.imageUrl} alt={item.title} />
        <h3>{item.title}</h3>
        <p>{item.type}</p>
      </Button>
    </li>
  );
}
