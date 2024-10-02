import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Homepage';
import Events from './components/Events';
import Marketplace from './components/Marketplace';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import './styles.css';
import LoginPage from './components/LoginpageNew';
import SignUpPage from './components/SignupPage';
import AddNFTForm from './components/AddNFTform';
import ProfilePage from './components/ProfilePage';
import EventForm from './components/EventForm';
import MovieDetails from './components/MovieDetails';
import NFTBillingPage from './components/NFTBilling';
import Collectibles from './components/Collectibles';
import Upload from './components/FileUpload';
import Map from './components/map';
import EventDetail from './components/EventDetail';
import YourTickets from './components/YourTickets'; // Import YourTickets component

const App = () => {
    const [featuredSlides, setFeaturedSlides] = useState([]);
    const [purchasedNFTs, setPurchasedNFTs] = useState([]);
    const [addedNFTs, setAddedNFTs] = useState([]);
    const [tickets, setTickets] = useState([]); // State to track booked tickets

    // Add new featured slide (e.g., after event creation)
    const handleEventSubmit = (imageUrl) => {
        setFeaturedSlides([...featuredSlides, imageUrl]);
    };

    // Add new NFT to the marketplace
    const handleAddNFT = (nft) => {
        setAddedNFTs([...addedNFTs, nft]);
    };

    // Handle NFT purchase
    const handleAddPurchasedNFT = (newNFT) => {
        setPurchasedNFTs([...purchasedNFTs, newNFT]);
    };

    // Event booking handler
    const handleBookNow = (eventDetails) => {
        setTickets([...tickets, eventDetails]); // Add booked event to tickets
        console.log('Ticket booked:', eventDetails);
    };

    // Predefined slides for the events page
    const upcomingSlides = [
        'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/12/30232004/arijit-singh.jpeg',
        'https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Music-Concert-Event-Ticket-Design-1536x864.jpg',
        'https://s1.ticketm.net/dam/a/7d5/97b67038-f926-4676-be88-ebf94cb5c7d5_1802151_TABLET_LANDSCAPE_LARGE_16_9.jpg'
    ];

    // Predefined NFTs for the marketplace
    const initialNFTs = [
        {
            imageSrc: "https://i.seadn.io/s/raw/files/21c89fb23006c3d424bbe9304b0f22c4.png?auto=format&dpr=1&w=512",
            title: "Zodiac #001",
            price: "0.12",
        },
        {
            imageSrc: "https://i.seadn.io/gcs/files/db2989d36f2b7c40c019a0cceb7b3a71.png?auto=format&dpr=1&w=512",
            title: "Zodiac #002",
            price: "0.04",
        },
        {
            imageSrc: "https://i.seadn.io/s/raw/files/22085c96c432ffe169c3c1dec3c5097d.jpg?auto=format&dpr=1&w=512",
            title: "Negative 1289",
            price: "0.10",
        },
        {
            imageSrc: "https://i.seadn.io/gcs/files/9b32deeb6b59d51f1ae009af70ca56ad.png?auto=format&dpr=1&w=512",
            title: "Zodiac #003",
            price: "0.002",
        },
        {
            imageSrc: "https://i.seadn.io/gcs/files/fb402688a93652f4bebb017e6dd29f6f.png?auto=format&dpr=1&w=512",
            title: "Zodiac #004",
            price: "0.24",
        },
        {
            imageSrc: "https://i.seadn.io/s/raw/files/b1182b0883a4972e125fc1f2e159e481.png?auto=format&dpr=1&w=512",
            title: "Zodiac #005",
            price: "0.10997",
        },
        {
            imageSrc: "https://i.seadn.io/gcs/files/1951e48af9d595c231d553571acd152c.png?auto=format&dpr=1&w=512",
            title: "Zodiac #006",
            price: "0.111",
        }
    ];

    return (
        <>
            <div>
                <NavBar />
                <Routes>
                    {/* Home Route */}
                    <Route exact path="/" element={<Home />} />

                    {/* Events Route */}
                    <Route
                        path="/Events"
                        element={<Events featuredSlides={featuredSlides} upcomingSlides={upcomingSlides} />}
                    />

                    {/* Marketplace Route */}
                    <Route
                        path="/MarketPlace"
                        element={<Marketplace existingNFTs={addedNFTs} initialNFTs={initialNFTs} onPurchaseNFT={handleAddPurchasedNFT} />}
                    />

                    {/* Authentication Routes */}
                    <Route path="/LoginpageNew" element={<LoginPage />} />
                    <Route path="/SignUpPage" element={<SignUpPage />} />

                    {/* Profile Page */}
                    <Route
                        path="/Profile"
                        element={<ProfilePage name="Your Name" email="dsdesai@gmail.com" username="dsdesai17" />}
                    />

                    {/* Event and NFT Creation Routes */}
                    <Route path="/AddNFTForm" element={<AddNFTForm onSubmit={handleAddNFT} />} />
                    <Route path="/EventForm" element={<EventForm onEventSubmit={handleEventSubmit} />} />

                    {/* Movie Details and NFT Billing Pages */}
                    <Route path="/Moviedetails" element={<MovieDetails />} />
                    <Route path="/NFTBilling" element={<NFTBillingPage />} />

                    {/* Purchased Collectibles Route */}
                    <Route path="/Collectibles" element={<Collectibles purchasedNFTs={purchasedNFTs} />} />

                    {/* File Upload Route */}
                    <Route path="/Upload" element={<Upload onSubmit={handleAddNFT} />} />

                    {/* Event Detail with Booking Functionality */}
                    <Route path="/event/:id" element={<EventDetail onBookNow={handleBookNow} />} />

                    {/* Map Route */}
                    <Route path="/map" element={<Map />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
