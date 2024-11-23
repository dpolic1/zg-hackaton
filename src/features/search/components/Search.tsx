import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { SearchInput } from "./search-input/SearchInput";
import { Filters } from "./filters/Filters";
import { TSearchState } from "../types";
import { useNavigate } from "react-router-dom";

type TSearchProps = {
  className?: string;
};
export function Search({ className }: TSearchProps) {
  // hooks
  const navigate = useNavigate();

  // state
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [hasInputBeenFocused, setHasInputBeenFocused] = useState(false);
  const [filtersManuallyClosed, setFiltersManuallyClosed] = useState(false);
  const [search, setSearch] = useState<TSearchState>({
    query: "",
    filters: {
      fromDate: "",
      toDate: "",
      price: "",
      category: "",
    },
  });

  // refs
  const searchFieldRef = useRef<HTMLInputElement>(null);

  // methods
  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
    setFiltersManuallyClosed(true);
  };

  const handleInputFocus = () => {
    if (!hasInputBeenFocused || filtersManuallyClosed) {
      setIsFiltersOpen(true);
      setHasInputBeenFocused(true);
      setFiltersManuallyClosed(false);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearch((prev) => ({ ...prev, query }));
  };

  const handleFiltersChange = (filterType: string, value: string) => {
    setSearch((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: value,
      },
    }));
  };

  const handleSearchSubmit = () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("q", search.query);
    urlSearchParams.set("fromDate", search.filters.fromDate);
    urlSearchParams.set("toDate", search.filters.toDate);
    urlSearchParams.set("price", search.filters.price);
    urlSearchParams.set("category", search.filters.category);

    navigate(`/search?${urlSearchParams.toString()}`);
  };

  return (
    <div className={cn(className, "")}>
      <SearchInput
        ref={searchFieldRef}
        onFocus={handleInputFocus}
        onChange={handleSearchChange}
        onSubmit={handleSearchSubmit}
        isFiltersOpen={isFiltersOpen}
      />

      {isFiltersOpen && (
        <Filters onClose={handleCloseFilters} onChange={handleFiltersChange} />
      )}
    </div>
  );
}
