import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { TCategoryFilterItem } from "../../types";

type TCategoryFilterProps = {
  className?: string;
  onClick: (categoryIds: number[]) => void;
};

export function CategoryFilter({ className, onClick }: TCategoryFilterProps) {
  const { data: categories, isLoading } = useCategories();

  // state
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  // handlers
  const handleClick = (item: TCategoryFilterItem) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(item.id)) {
        // Deselect the category
        return prevSelected.filter((id) => id !== item.id);
      } else {
        // Select the category
        return [...prevSelected, item.id];
      }
    });
  };

  useEffect(() => {
    onClick(selectedCategories);
  }, [selectedCategories]);

  return (
    <div className={cn(className, "")}>
      <h3 className="text-lg font-semibold">Category</h3>
      <ul className="flex flex-wrap gap-2 mt-2">
        {isLoading &&
          !categories.length &&
          Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <Button variant="outline" size="sm" disabled>
                Loading...
              </Button>
            </li>
          ))}

        {!isLoading &&
          categories.length &&
          categories.map((item) => (
            <li key={item.id}>
              <button
                className={cn(
                  "px-3 py-1 rounded-sm border border-black",
                  selectedCategories.includes(item.id) ? "bg-black text-white" : "bg-background text-black"
                )}
                onClick={() => handleClick(item)}
              >
                {item.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
