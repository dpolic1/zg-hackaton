import { Button } from "@/components/ui/button";
import { TPriceFilterItem } from "../../types";
import { cn } from "@/lib/utils";

type TPriceFilterProps = {
  className?: string;
  onClick: (priceItem: TPriceFilterItem) => void;
};

export function PriceFilter({ className, onClick }: TPriceFilterProps) {
  const priceItems: TPriceFilterItem[] = [
    { label: "Free", value: "free" },
    { label: "Under $25", value: "under-25" },
    { label: "Under $50", value: "under-50" },
    { label: "Under $100", value: "under-100" },
    { label: "Any", value: "any" },
  ];

  return (
    <div className={cn(className, "")}>
      <h3 className="text-lg font-semibold">Price</h3>
      <ul className="flex flex-wrap gap-2">
        {priceItems.map((item) => (
          <li key={item.value}>
            <Button variant="secondary" size="sm" onClick={() => onClick(item)}>
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
