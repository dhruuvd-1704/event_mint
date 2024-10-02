import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Q4MoaEl5G03UchtHVEDRNEddhF5XYVIjB3cNh883tHVrrcu7ZOwx26FordAUHqZsq0F9diGxqk1pH0fjE1wDc2T00udCMQCzP"
); // Replace with your actual Stripe public key

const EventDetail = ({ onBookNow }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [userId, setUserId] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const stripe = useStripe();
  const elements = useElements();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for image modal

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    fetchEventDetail();
  }, []);

  const fetchEventDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event detail:", error);
    }
  };

  const handleBookNow = async () => {
    if (event && stripe && elements) {
      const ticketDetails = {
        eventId: event._id,
        quantity: 1,
        totalPrice: event.ticketPrice,
      };

      try {
        setIsLoading(true); // Start loading
        // Step 1: Create a Payment Intent
        const paymentIntentResponse = await axios.post(
          "http://localhost:5000/create-payment-intent",
          ticketDetails,
          { withCredentials: true }
        );

        setClientSecret(paymentIntentResponse.data.clientSecret);

        // Step 2: Confirm Payment using Stripe
        const cardElement = elements.getElement(CardElement);
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (paymentResult.error) {
          console.error("Payment failed:", paymentResult.error.message);
          alert("Payment failed: " + paymentResult.error.message);
        } else if (paymentResult.paymentIntent.status === "succeeded") {
          // Step 3: Book the ticket after successful payment
          const response = await axios.post(
            "http://localhost:5000/book-tickets",
            ticketDetails,
            { withCredentials: true }
          );
          alert(
            `Payment of $${event.ticketPrice} successful! Your Ticket is Booked!`
          );
          onBookNow(ticketDetails);
        }
      } catch (error) {
        console.error("Error booking ticket or initiating payment:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!event) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="bg-transparent bg-opacity-90 backdrop-blur-md text-white p-6 lg:p-12 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-center">{event.eventName}</h1>
      <div className="relative mb-8 cursor-pointer" onClick={openModal}>
        <img
          src={event.imageUrl}
          alt={event.eventName}
          className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="space-y-4 border-t border-gray-600 pt-4">
        <p className="text-lg">
          <strong>Description:</strong> {event.eventDescription}
        </p>
        <p className="text-lg">
          <strong>Location:</strong> {event.eventLocation}
        </p>
        <p className="text-lg">
          <strong>Price:</strong> ${event.ticketPrice}
        </p>
        <p className="text-lg">
          <strong>Start Date:</strong>{" "}
          {new Date(event.startDate).toLocaleDateString()}
        </p>
        <p className="text-lg">
          <strong>End Date:</strong>{" "}
          {new Date(event.endDate).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-8 text-center">
        <button
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={handleBookNow}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Processing Payment..." : "Book Now"}
        </button>
      </div>
      {/* Add a Card Element to collect card details */}
      <div className="mt-4">
        <CardElement />
      </div>

      {/* Modal for Full Image View */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="relative bg-gray-800 rounded-lg p-4">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={closeModal}
            >
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

// Wrap EventDetail with Elements to use Stripe
const WrappedEventDetail = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <EventDetail {...props} />
    </Elements>
  );
};

export default WrappedEventDetail;
