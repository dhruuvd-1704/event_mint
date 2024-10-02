import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YourTickets from "./YourTickets";
import "./EventDetail.css"; // Adjust the path if necessary

const EventBooking = () => {
  const [tickets, setTickets] = useState([]);
  const [event, setEvent] = useState(null);
  const { id } = useParams(); // Get the event id from URL params
  const [userId, setUserId] = useState(null); // Track the authenticated user ID

  useEffect(() => {
    fetchEventDetail();
    fetchTickets(); // Fetch tickets when the component mounts
    fetchUserId(); // Fetch user ID when the component mounts
  }, [id]);

  const fetchEventDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/my-tickets"); // Fetch tickets for the logged-in user
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Profile"); // Assuming this returns user data
      setUserId(response.data._id); // Set the user ID
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const handleBookNow = async (eventDetails) => {
    if (eventDetails && userId) {
      try {
        const bookingData = {
          eventId: eventDetails._id,
          userId: userId, // Use the authenticated user ID
          quantity: 1, // Assume 1 ticket for simplicity
          totalPrice: eventDetails.price, // Ensure your event data contains the price
        };

        // Post the booking to the backend
        await axios.post("http://localhost:5000/book-tickets", bookingData);

        console.log("Ticket booked for event:", eventDetails);

        // Fetch updated tickets after booking
        fetchTickets();
      } catch (error) {
        console.error("Error booking ticket:", error);
      }
    }
  };

  if (!event) return <p className="text-center">Loading event details...</p>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">Event Booking</h1>
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">{event.eventName}</h2>
        <p className="mt-2">{event.eventDescription}</p>
        <p>
          <strong>Location:</strong> {event.eventLocation}
        </p>
        <p>
          <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}
        </p>
        <p>
          <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
        </p>
        <button
          onClick={() => handleBookNow(event)} // Pass the event details for booking
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </div>
      <YourTickets tickets={tickets} />
    </div>
  );
};

export default EventBooking;
