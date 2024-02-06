
import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Homepage'
import Events from './components/Events'

import Marketplace from './components/Marketplace'


import { Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'


import Card from './components/Card'
import './styles.css'


import SiteMap from './components/map'
import LoginPage from './components/LoginpageNew'
import SignUpPage from './components/SignupPage'
import AddNFTPage from './components/AddNFTpage'
import ProfilePage from './components/ProfilePage'
import Sidebar from './components/Sidebar'
import EventForm from './components/EventForm'




const App = () => {
  const featuredSlides = [
    'https://autowithsid.in/wp-content/uploads/2023/06/Animal-Upcoming-Ranbir-Kapoor-Movie-2023.jpg',
    'https://bingeddata.s3.amazonaws.com/uploads/2022/05/Salaar-Poster-Teases-Prabhas-Kicking-Some-High-Octane-Action.jpg',
    'https://i.ytimg.com/vi/Kwmid4Ud1ao/maxresdefault.jpg'
  ];

  const upcomingSlides = [
    'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/12/30232004/arijit-singh.jpeg',
    'https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Music-Concert-Event-Ticket-Design-1536x864.jpg',
    'https://s1.ticketm.net/dam/a/7d5/97b67038-f926-4676-be88-ebf94cb5c7d5_1802151_TABLET_LANDSCAPE_LARGE_16_9.jpg'
  ];
  return (
    // <>
    //   <NavBar />
    //   <Routes>
    //     <Route exact path="/" element={<Home />} />
    //     <Route path="/Events" element={<Events featuredSlides={featuredSlides} upcomingSlides={upcomingSlides} />} />
    //     <Route path="/MarketPlace" element={<Marketplace />} />
    //     <Route path="/LoginpageNew" element={<LoginPage />} />
    //     <Route path="/SignUpPage" element={<SignUpPage />} />
    //   </Routes>
    //   <Footer />
    // </>


    <>
      <div className=' flex'>
        <Sidebar />
        <Routes>
          <Route path='/Profile' element={<ProfilePage
            name="John Doe"
            email="johndoe@example.com"
            walletAddress="0x123abc..." />} />
        </Routes>

      </div>
    </>







  )
}

export default App;
