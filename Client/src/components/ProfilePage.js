import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddNFTForm from './AddNFTform';
import Sidebar from './Sidebar';
import axios from 'axios';
import YourTickets from './YourTickets'; // Import YourTickets component

const ProfilePage = ({ name, email, username }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [showTickets, setShowTickets] = useState(false); // State to toggle tickets view

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            // Make an API call to log out the user
            await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
            // Clear any user data if needed (e.g., local storage)
            localStorage.removeItem('userId'); // Clear userId from local storage
            navigate("/LoginpageNew"); // Redirect to login page
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Navigate to Add NFT, Upload, and Event Form
    const navigateToNFT = () => navigate('/AddNFTform');
    const navigateToUpload = () => navigate('/Upload');
    const navigateToAdd = () => navigate('/EventForm');

    // Function to toggle 'My Collectibles' view
    const navigateToCollectibles = () => setShowTickets(!showTickets);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch profile details
                const response = await axios.get("http://localhost:5000/Profile", {
                    withCredentials: true,
                });

                if (response.data.msg === "Success") {
                    setUserData(response.data.user); // Set user data here
                } else {
                    navigate("/LoginpageNew");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                navigate("/LoginpageNew"); // Redirect to login on error
            }
        };

        fetchUserData(); // Call the function to fetch user data
    }, [navigate]);

    if (!userData) {
        return <div>Loading...</div>; // Optional loading state
    }

    return (
        <main className='flex flex-col sm:flex-row'>
            <div className="flex-grow">
                <div className="container mx-auto py-8 px-4">
                    <div className="rounded-lg shadow-lg overflow-hidden backdrop-blur-[40px]">
                        <div className="px-6 py-4">
                            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 text-center">Profile</h1>
                            <div className="mb-10 mt-10">
                                <div className="flex flex-col sm:flex-row items-center mb-8">
                                    <span className="text-lg sm:text-xl font-semibold text-white mr-2 mb-2 sm:mb-0">Email:</span>
                                    <p className="text-lg sm:text-xl text-gray-800">{userData.email}</p>
                                </div>
                                <hr className="border-t border-gray-200 mb-6" />
                                <div className="flex flex-col sm:flex-row items-center">
                                    <span className="text-lg sm:text-xl font-semibold text-white mr-2 mb-2 sm:mb-0">Username:</span>
                                    <p className="text-lg sm:text-xl text-gray-800">{userData.username}</p>
                                </div>
                            </div>
                            <hr className="border-t border-gray-200 mb-6" />
                            <div className='buttons mt-12 flex flex-col sm:flex-row items-center'>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    className="bg-black opacity-70 text-white text-lg sm:text-sm p-4 rounded-md hover:opacity-100 hover:cursor-pointer mb-4 sm:mb-0 mr-0 sm:mr-4"
                                    onClick={navigateToNFT}
                                >
                                    Add Your NFT
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    className="bg-black opacity-70 text-white text-lg sm:text-sm p-4 rounded-md hover:opacity-100 hover:cursor-pointer"
                                    onClick={navigateToAdd}
                                >
                                    Add Your Event
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    className="bg-black opacity-70 text-white text-lg sm:text-sm p-4 rounded-md mx-5 hover:opacity-100 hover:cursor-pointer"
                                    onClick={navigateToUpload}
                                >
                                    Mint Your NFT
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    className="bg-black opacity-70 text-white text-lg sm:text-sm p-4 rounded-md mx-5 hover:opacity-100 hover:cursor-pointer"
                                    onClick={navigateToCollectibles}
                                >
                                    My Tickets
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    className="bg-red-600 opacity-70 text-white text-lg sm:text-sm p-4 rounded-md mx-5 hover:opacity-100 hover:cursor-pointer"
                                    onClick={handleLogout} // Add onClick for logout
                                >
                                    Logout
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Conditionally render YourTickets component */}
                    {showTickets && (
                        <div className="mt-10">
                            <YourTickets /> {/* Renders YourTickets component when My Collectibles is clicked */}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
