import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EventItem from './EventItem'; // Import the new EventItem component

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/events');
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleEventClick = (id) => {
        navigate(`/event/${id}`); // Redirect to the detailed event page
    };

    return (
        <main>
            <div className="mt-20 bg-gray-900 shadow-white h-72 shadow-sm">
                <h1 className="text-center pt-24 text-white font-bold text-4xl sm:text-7xl drop-shadow-xl shadow-white">
                    Upcoming Events
                </h1>
            </div>

            <main className="place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ml-9 mr-9 gap-8 mt-8 mb-8">
                {events.length > 0 ? (
                    events.map(event => (
                        <EventItem
                            key={event._id}
                            id={event._id} // Pass the ID
                            imageSrc={event.imageUrl}
                            title={event.eventName}
                            onClick={() => handleEventClick(event._id)} // Handle click
                        />
                    ))
                ) : (
                    <p className="text-white text-center">No events available.</p>
                )}
            </main>
        </main>
    );
};

export default EventsPage;
