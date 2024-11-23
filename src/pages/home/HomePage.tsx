import { RecentlyViewed } from "@/features/recently-viewed";
import { Search } from "@/features/search";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function HomePage() {
  
  const searchBarIconClicked = useLocation();
  useEffect(()=>{
    console.log(searchBarIconClicked)
  })
  return (
    <div>
      <div className="flex gap-10">
        <Search className="bg-primary" />
      </div>
      <RecentlyViewed />
    </div>
  );
}
