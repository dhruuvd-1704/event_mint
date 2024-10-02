import React, { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
    const [eventData, setEventData] = useState({
        image: null,
        eventName: '',
        email: '',
        contactNumber: '',
        eventLocation: '',
        eventType: '',
        ticketPrice: '',
        startDate: '',
        endDate: '',
        eventDescription: '',
        receiverAddress: ''  // Add field for receiver address
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleFileChange = (e) => {
        setEventData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(eventData).forEach(key => {
            formData.append(key, eventData[key]);
        });
        try {
            const response = await axios.post('http://localhost:5000/upload-nft', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response from server:", response.data);
            alert('NFT minted successfully!');
            setEventData({
                image: null,
                eventName: '',
                email: '',
                contactNumber: '',
                eventLocation: '',
                eventType: '',
                ticketPrice: '',
                startDate: '',
                endDate: '',
                eventDescription: '',
                receiverAddress: ''  // Reset receiver address
            });
        } catch (error) {
            console.error('Error:', error.response || error.message);
            alert('An error occurred while minting the NFT.');
        }
    };

    return (
        <div className="flex justify-center items-center w-[80%]">
            <div className="bg-transparent rounded-lg p-8 max-w-[100%] shadow-lg backdrop-blur-[30px] w-[80%] m-[30px] mt-[50px]">
                <h1 className="text-3xl font-bold text-center text-white mb-8">Add Your Event</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="image" className="block text-white font-medium">Image</label>
                        <input type="file" id="image" onChange={handleFileChange} className="w-full bg-transparent py-2 px-4 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="eventName" className="block text-white font-medium">Event Name</label>
                        <input type="text" id="eventName" value={eventData.eventName} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-white font-medium">Email</label>
                        <input type="email" id="email" value={eventData.email} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="contactNumber" className="block text-white font-medium">Contact Number</label>
                        <input type="tel" id="contactNumber" value={eventData.contactNumber} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="eventLocation" className="block text-white font-medium">Location of Event</label>
                        <input type="text" id="eventLocation" value={eventData.eventLocation} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="eventType" className="block text-white font-medium">Event Type</label>
                        <select id="eventType" value={eventData.eventType} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required>
                            <option value="" disabled>Select Event Type</option>
                            <option value="Sports">Sports</option>
                            <option value="Concert">Concert</option>
                            <option value="Art">Art</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ticketPrice" className="block text-white font-medium">Ticket Price (In Rs.)</label>
                        <input type="number" id="ticketPrice" value={eventData.ticketPrice} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-white font-medium">Start Date</label>
                        <input type="date" id="startDate" value={eventData.startDate} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-white font-medium">End Date</label>
                        <input type="date" id="endDate" value={eventData.endDate} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="eventDescription" className="block text-white font-medium">Event Description</label>
                        <textarea id="eventDescription" value={eventData.eventDescription} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="receiverAddress" className="block text-white font-medium">Receiver Address</label>
                        <input type="text" id="receiverAddress" value={eventData.receiverAddress} onChange={handleChange} className="w-full bg-transparent border-b-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-6 hover:bg-blue-600 transition duration-300 ease-in-out">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
