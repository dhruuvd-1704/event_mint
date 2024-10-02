import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetail = ({ onBookNow }) => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        fetchEventDetail();
    }, [id]);
    useEffect(() => {
        // Retrieve userId from local storage
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId); // Set userId from local storage
        fetchEventDetail();
    }, [id]);

    const fetchEventDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/events/${id}`);
            setEvent(response.data);
        } catch (error) {
            console.error("Error fetching event detail:", error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleBookNow = async () => {
        if (event) {
            console.log(event._id);
            
            const ticketDetails = {
                eventId: event._id, // Use event ID here
                quantity: 1,
                totalPrice: event.ticketPrice,
                userId:userId
                // Assuming the event has a ticket price
            };
    
            // Log the ticketDetails object to the console
            console.log('Ticket Details:', ticketDetails);
            
            try {
                const response = await axios.post('http://localhost:5000/book-tickets', ticketDetails, {
                    withCredentials: true // Ensure credentials are included
                });
                console.log(response);
                console.log('Ticket booked:', response.data);
                onBookNow(ticketDetails); // Update state in App.js if needed
            } catch (error) {
                console.error("Error booking ticket:", error);
            }
        }
    };
    
    

    if (!event) return <p className="text-center text-white">Loading...</p>;

    return (
        <div className="bg-transparent bg-opacity-90 backdrop-blur-md text-white p-6 lg:p-12 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-center">{event.eventName}</h1>
            <div className="relative mb-8 cursor-pointer" onClick={openModal}>
                <img 
                    src={event.imageUrl} 
                    alt={event.eventName} 
                    className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
            </div>
            <div className="space-y-4 border-t border-gray-600 pt-4">
                <p className="text-lg">
                    <strong>Description:</strong>
                    <span className="block bg-gray-800 bg-opacity-20 backdrop-blur-[30px] p-2 rounded-lg mt-2">{event.eventDescription}</span>
                </p>
                <p className="text-lg">
                    <strong>Location:</strong>
                    <span className="block bg-gray-800 bg-opacity-20 backdrop-blur-[30px] p-2 rounded-lg mt-2">{event.eventLocation}</span>
                </p>
                <p className="text-lg">
                    <strong>Start Date:</strong>
                    <span className="block bg-gray-800 bg-opacity-20 backdrop-blur-[30px] p-2 rounded-lg mt-2">{new Date(event.startDate).toLocaleDateString()}</span>
                </p>
                <p className="text-lg">
                    <strong>End Date:</strong>
                    <span className="block bg-gray-800 bg-opacity-20 backdrop-blur-[50px] p-2 rounded-lg mt-2">{new Date(event.endDate).toLocaleDateString()}</span>
                </p>
            </div>
            <div className="mt-8 text-center">
                <button 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-blue-600"
                    onClick={handleBookNow} // Attach the booking function
                >
                    Book Now
                </button>
            </div>

            {/* Modal for Full Image View */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                    <div className="relative bg-gray-800 rounded-lg p-4">
                        <button className="absolute top-2 right-2 text-white" onClick={closeModal}>
                            &times; {/* Close button */}
                        </button>
                        <img 
                            src={event.imageUrl} 
                            alt={event.eventName} 
                            className="max-w-full max-h-[80vh] object-contain" 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetail;
