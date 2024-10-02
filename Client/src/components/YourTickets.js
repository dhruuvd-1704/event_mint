import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YourTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tickets');
             // Fetch booked tickets from backend
            setTickets(response.data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Your Tickets</h2>
            {tickets.length === 0 ? (
                <p className="text-gray-600">No tickets booked yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tickets.map(ticket => (
                        <div key={ticket._id} className="bg-gray-700 bg-opacity-20 backdrop-blur-[30px] rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
                            <h3 className="text-lg font-bold">{ticket.eventName}</h3>
                            <p className="mt-2">
                                <strong>Quantity:</strong> {ticket.quantity} ticket(s)
                            </p>
                            <p className="mt-1 text-gray-400">
                                <strong>Total Price:</strong> ₹{ticket.totalPrice}
                            </p>
                            <p className="mt-2 text-gray-500">
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
