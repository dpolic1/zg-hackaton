interface MapLoader {
    eventLocation: { lat: number; lng: number };
}

export const Map = ({ eventLocation }: MapLoader) => {
    const apiKey = "AIzaSyB5p476Apq41dAgr2zCIlNue2RQCXSaXws";
    const mapSrc = `https://maps.googleapis.com/maps/api/staticmap?center=${eventLocation.lat},${eventLocation.lng}&zoom=12&size=600x300&markers=${eventLocation.lat},${eventLocation.lng}&key=${apiKey}`;
    const googleMapsUrl = `https://www.google.com/maps/?q=${eventLocation.lat},${eventLocation.lng}`;

    return (
        <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <img
                    src={mapSrc}
                    alt="Static Map"
                    className="w-full h-60 object-cover" // Maintain aspect ratio
                />
            </a>
        </div>
    );
};
