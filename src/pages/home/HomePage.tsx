import { RecentlyViewed } from "@/features/recently-viewed";
import { Map, setUpScriptForAPI } from "@/features/map";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function HomePage() {

  const [showMap, setShowMap] =  useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const hasFetched = useRef(false);


  useEffect( ()=> {
    if (!hasFetched.current && !isLoaded) {
      console.log("USEEFFECT")
      setUpScriptForAPI(setIsLoaded);
      hasFetched.current = true;
    }
  }, []);

  return (
    <div>
      
      <div className="mt-12">
        {showMap ? 
           <Map isLoaded={isLoaded} /> : <RecentlyViewed />}
      </div>
      <div><Button
      className="mb-5 mt-5"
      onClick={()=>setShowMap((prev)=>!prev)}>{!showMap? "Switch to map" : "Switch to standard"}</Button>
      </div>
      
    </div>
  );
}

