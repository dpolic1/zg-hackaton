import React from "react";
import { Map } from "@/features/map";
import { useLocation } from "react-router-dom";

type Event = {
    id: number;
    eventImageUrl: string;
    shortName: string;
    longName: string;
    startDate: string | null;
    endDate: string | null;
    location: { lat: number; lng: number } | null; // Ensure location has lat and lng
    description: string;
    eventCategories: string[] | null;
    eventTypes: string[] | null;
};

export const EventDetailsFeature: React.FC = () => {
    const location = useLocation();
    const event: Event | null = location.state;

    if (!event) {
        return <div className="text-center text-gray-600">No event details available.</div>;
    }

    return (
        <div className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Close Button */}
            <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                aria-label="Close"
                onClick={() => window.history.back()}
            >
                ✕
            </button>

            {/* Event Image */}
            <div className="relative w-full h-60 bg-gray-200">
                <img
                    src={event.eventImageUrl || "https://via.placeholder.com/800x400"}
                    alt={event.shortName}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-6">
                {/* Event Title */}
                <h1 className="text-2xl font-bold mb-2">{event.longName || "Untitled Event"}</h1>

                {/* Categories */}
                {event.eventCategories?.length ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {event.eventCategories.map((category, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                            >
                {category}
              </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No categories available.</p>
                )}

                {/* Event Details */}
                <p className="text-gray-600 mb-4">
                    {event.startDate
                        ? `From ${new Date(event.startDate).toLocaleString()}`
                        : ""}
                    {event.endDate
                        ? ` to ${new Date(event.endDate).toLocaleString()}`
                        : ""}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-6">
                    <button
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-sm"
                        onClick={() => console.log("Shared!")}
                    >
                        Podijeli
                    </button>
                    <button
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow-sm"
                        onClick={() => console.log("Saved!")}
                    >
                        Spremi
                    </button>
                </div>

                {/* Location */}
                {event.location ? (
                    <div className="mb-6">
                        <h3 className="font-semibold text-lg mb-2">Lokacija</h3>
                        <div className="mt-4">
                            <Map eventLocation={event.location} /> {/* Pass lat/lng object */}
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">Location not available.</p>
                )}

                {/* Description */}
                <div>
                    <h3 className="font-semibold text-lg mb-2">Opis</h3>
                    <p className="text-gray-600 whitespace-pre-line">{event.description || "No description available."}</p>
                </div>
            </div>
        </div>
    );
};
