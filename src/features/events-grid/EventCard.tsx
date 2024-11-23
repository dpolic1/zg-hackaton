import React from "react";
import { TEvent } from "../search/types";

type TEventCardProps = {
  event: TEvent; // Updated to accept multiple tags
};

export function EventCard({ event }: TEventCardProps) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      {/* Event Image */}
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />

      {/* Event Details */}
      <div className="p-4">
        {/* Event Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Event Title */}
        <h3 className="text-lg font-bold mt-2">{event.title}</h3>

        {/* Event Location */}
        <p className="text-sm text-gray-600">{event.location}</p>

        {/* Event Date and Time */}
        <p className="text-sm text-gray-500">
          {event.date} at {event.time}
        </p>
      </div>
    </div>
  );
}
