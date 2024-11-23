import { cn } from "@/lib/utils";
import { TCategoryFilterItem } from "../../types";
import { Button } from "@/components/ui/button";
import { useCategories } from "../../hooks/useCategories";

type TCategoryFilterProps = {
  className?: string;
  onClick: (categoryItem: TCategoryFilterItem) => void;
};

export function CategoryFilter({ className, onClick }: TCategoryFilterProps) {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className={cn(className, "")}>
      <h3 className="text-lg font-semibold">Category</h3>
      <ul className="flex flex-wrap gap-2">
        {isLoading &&
          !categories.length &&
          Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <Button variant="secondary" size="sm" disabled>
                Loading...
              </Button>
            </li>
          ))}

        {!isLoading &&
          categories.length &&
          categories.map((item) => (
            <li key={item.id}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onClick(item)}
              >
                {item.name}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
}
