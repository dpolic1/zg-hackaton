import React from "react";

interface EventCardProps {
    image: string;
    title: string;
    location: string;
    date: string;
    time: string;
    tags: string[]; // Updated to accept multiple tags
}

export const EventCard: React.FC<EventCardProps> = ({
                                                        image,
                                                        title,
                                                        location,
                                                        date,
                                                        time,
                                                        tags,
                                                    }) => {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            {/* Event Image */}
            <img src={image} alt={title} className="w-full h-48 object-cover" />

            {/* Event Details */}
            <div className="p-4">
                {/* Event Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                        >
              {tag}
            </span>
                    ))}
                </div>

                {/* Event Title */}
                <h3 className="text-lg font-bold mt-2">{title}</h3>

                {/* Event Location */}
                <p className="text-sm text-gray-600">{location}</p>

                {/* Event Date and Time */}
                <p className="text-sm text-gray-500">
                    {date} at {time}
                </p>
            </div>
        </div>
    );
};
