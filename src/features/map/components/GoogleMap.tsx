import { useEffect } from "react";


interface MapLoader {
  isLoaded: boolean;
  eventLocation: {lat : number, lng : number}
}

export const Map = ( {eventLocation }: MapLoader) => {

  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=AIzaSyB5p476Apq41dAgr2zCIlNue2RQCXSaXws&center=${eventLocation.lat},${eventLocation.lng}&zoom=${12}`;
  const mapUrl = `https://www.google.com/maps/?q=${eventLocation.lat},${eventLocation.lng}`;

  useEffect(()=>{
    console.log(eventLocation)
  })

  return (
      <div style={{ width: "100%", height: "500px" }}>
       <a href={mapUrl} target="_blank" rel="noopener noreferrer">
        <iframe
          src={mapSrc}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
          }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        />
      </a>
    </div>
  );
};