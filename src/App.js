
import React from 'react'
import NavBar from './components/NavBar'
import Home from './components/Homepage'
import Events from './components/Events'
import Profile from './components/LoginPage'
import Homepage from './components/Homepage'

import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'


import './styles.css'


const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Events" component={Events} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      <Footer />


    </>
  )
}

export default App;



