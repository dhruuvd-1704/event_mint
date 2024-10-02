import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const YourTickets = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate(); // React Router navigation hook

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/my-tickets', { withCredentials: true });
            console.log(response.data);
            // Fetch booked tickets from backend
            setTickets(response.data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    const handleTicketClick = (eventId) => {
        navigate(`/event/${eventId}`); // Redirect to EventDetail page with eventId
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Tickets</h2>
            {tickets.length === 0 ? (
                <p className="text-gray-600">No tickets booked yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tickets.map(ticket => (
                        <div
                            key={ticket._id}
                            className="bg-gray-700 bg-opacity-25 backdrop-blur-[50px] rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                            onClick={() => handleTicketClick(ticket.eventId._id)} // Use eventId for navigation
                        >
                            <h3 className="text-lg font-bold text-white">{ticket.eventId.eventName || 'Event not found'}</h3> {/* Access eventName from populated eventId */}
                            <p className="mt-2 text-white">
                                <strong>Quantity:</strong> {ticket.quantity} ticket(s)
                            </p>
                            <p className="mt-1 text-white">
                                <strong>Total Price:</strong> ₹{ticket.totalPrice}
                            </p>
                            <p className="mt-2 text-white">
                                <strong>Booking ID:</strong> {ticket._id}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YourTickets;
