import { cn } from "@/lib/utils";
import { useState } from "react";
import { TPriceFilterItem } from "../../types";

type TPriceFilterProps = {
  className?: string;
  onClick: (priceItem: TPriceFilterItem) => void;
};

export function PriceFilter({ className, onClick }: TPriceFilterProps) {
  // state
  const [selectedPriceItem, setSelectedPriceItem] = useState("any");

  const priceItems: TPriceFilterItem[] = [
    { label: "Free", value: "free" },
    { label: "Under $25", value: "under-25" },
    { label: "Under $50", value: "under-50" },
    { label: "Under $100", value: "under-100" },
    { label: "Any", value: "any" },
  ];

  // handlers
  const handleClick = (item: TPriceFilterItem) => {
    setSelectedPriceItem(item.value);
    onClick(item);
  };

  return (
    <div className={cn(className)}>
      <h3 className="text-lg font-semibold">Price</h3>
      <ul className="flex flex-wrap gap-2 mt-2">
        {priceItems.map((item) => (
          <li key={item.label}>
            <button
              className={cn(
                "px-3 py-1 rounded-sm border border-black",
                item.value === selectedPriceItem ? "bg-black text-white" : "bg-background text-black"
              )}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
