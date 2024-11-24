import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { forwardRef } from "react";

type TSearchInputProps = {
  className?: string;
  isFiltersOpen: boolean;
  onFocus: () => void;
  onChange: (query: string) => void;
  onSubmit: () => void;
};

export const SearchInput = forwardRef<HTMLInputElement, TSearchInputProps>(
  (props: TSearchInputProps, ref) => {
    const { className, isFiltersOpen, onFocus, onChange, onSubmit } = props;

    return (
      <div className="fixed top-32 left-0 right-0 flex items-center gap-2 px-8 z-20">
        <Input
          type="text"
          ref={ref}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className={cn(className, "grow rounded-full")}
          placeholder="Search..."
        />

        {isFiltersOpen && (
          <Button
            type="button"
            onClick={onSubmit}
            className="bg-black text-white rounded-full w-9 h-9 border border-black"
          >
            <SearchIcon size={24} />
          </Button>
        )}
      </div>
    );
  }
);
