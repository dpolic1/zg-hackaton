import { Map } from "@/features/map";
import { TRecentlyViewed } from "@/features/recently-viewed/types/recently-viewed-types";
import { useLocation } from "react-router-dom";


export const EventDetailsFeature = () => {

  const location = useLocation();
  const event : TRecentlyViewed = location.state;
  


  return (
    <>
     <li>
     <img src={event.imageUrl} alt={event.title} />
        <h3>{event.title}</h3>
        <p>{event.type}</p>
        <div className="mt-12">
           <Map eventLocation={event.location} />
        </div>
      </li>
     

    </>
  );
};
