import { Map, setUpScriptForAPI } from "@/features/map";
import { TRecentlyViewed } from "@/features/recently-viewed/types/recently-viewed-types";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";


export const EventDetailsFeature = () => {

  const location = useLocation();
  const event : TRecentlyViewed = location.state;
  
  const [isLoaded, setIsLoaded] = useState(false);
  const hasFetched = useRef(false);


  useEffect( ()=> {
    if (!hasFetched.current && !isLoaded) {
      setUpScriptForAPI(setIsLoaded);
      hasFetched.current = true;
    }
  }, []);

  return (
    <>
     <li>
     <img src={event.imageUrl} alt={event.title} />
        <h3>{event.title}</h3>
        <p>{event.type}</p>
        <div className="mt-12">
           <Map  isLoaded={isLoaded} eventLocation={event.location} />
        </div>
      </li>
     

    </>
  );
};
