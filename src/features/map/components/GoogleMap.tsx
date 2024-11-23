import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";


interface MapProps {
  isLoaded: boolean;
}


export const Map = ( {isLoaded}: MapProps) => {
  const containerStyle = {
    width: "100%",
    height: "500px",
  };


  const center = {
    lat: 45.815, // Zagreb
    lng: 15.9819,
  };
  const markerPosition = useMemo(
    () => ({
      lat: 45.8,
      lng: 15.9819,
    }),
    []
  );

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          <Marker position={markerPosition}></Marker>
          
        </GoogleMap>
      ) : (
        <div>Loading map...</div>
      )}
    </>
  );
};
