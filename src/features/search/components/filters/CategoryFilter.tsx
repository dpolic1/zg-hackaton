import { cn } from "@/lib/utils";
import { TCategoryFilterItem } from "../../types";
import { Button } from "@/components/ui/button";

type TCategoryFilterProps = {
  className?: string;
  onClick: (categoryItem: TCategoryFilterItem) => void;
};

export function CategoryFilter({ className, onClick }: TCategoryFilterProps) {
  const categoryItems: TCategoryFilterItem[] = [
    { label: "All", value: "all" },
    { label: "Art", value: "art" },
    { label: "Music", value: "music" },
    { label: "Food", value: "food" },
    { label: "Sports", value: "sports" },
    { label: "Tech", value: "tech" },
    { label: "Health", value: "health" },
    { label: "Fashion", value: "fashion" },
    { label: "Film", value: "film" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className={cn(className, "")}>
      <h3 className="text-lg font-semibold">Category</h3>
      <ul className="flex flex-wrap gap-2">
        {categoryItems.map((item) => (
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
