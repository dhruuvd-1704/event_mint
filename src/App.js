
import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Homepage'
import Events from './components/Events'
import Profile from './components/LoginPage'
import Marketplace from './components/Marketplace'


import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'


import Card from './components/Card'
import './styles.css'

import SiteMap from './components/map'


const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/MarketPlace" element={<Marketplace/>} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      <Footer />



    </>
    // {/* <SiteMap></SiteMap> */}
  )
}

export default App;



// App.js

