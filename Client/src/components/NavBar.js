
import React from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useRef, useState, useEffect } from 'react'
import './navbar.css'
import home from './home.svg'
import event from './event.png'
import marketplace from './ethereum.png'
import profile from './profile.png'
import { Link } from 'react-router-dom'
import logo from './EventMint_logo.png'
import LoginPage from './LoginpageNew'

const NavBar = () => {
    const navRef = useRef();
    const showNav = () => {
        navRef.current.classList.toggle("responsive_nav")

    }

    // useEffect(() => {
    //     // Check user login status here and update setUserLoggedIn accordingly
    //     // For example, you might fetch this information from your authentication system
    //     // setUserLoggedIn(true); // Set to true if the user is logged in
    // }, []);

    return (
        <>
            <header className='mb-10 ' >
                <nav className='main  backdrop-blur-sm pb-0 mb-10 shadow   ' ref={navRef}>
                    <div className='Title'>
                        <img className='logo' src={logo} alt='EventMint' />
                    </div>
                    <div className='menu'>
                        <ul>
                            <li>
                                <div className='home-menu'>
                                    <Link to="/" className='home'>
                                        <img className='home-icon' src={home} /> Home
                                    </Link>
                                </div>

                            </li>
                            <li>
                                <div className='events-menu'>
                                    <Link to="/Events" className='event'>
                                        <img className='event-icon' src={event} /> Events
                                    </Link>
                                </div>

                            </li>
                            <li>
                                <div className='marketplace-menu'>
                                    <Link to="/MarketPlace" className='marketplace'>
                                        <img className='marketplace-icon' src={marketplace} />MarketPlace
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='profile'>
                        <ul>

                            <li>
                                <Link to='/LoginpageNew' className='profile-main'>
                                    <img className='profile-icon' src={profile} alt="Profile Icon" /> Profile
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <button onClick={showNav} className='nav-btn nav-close-btn'>
                        <FaTimes />
                    </button>
                </nav>
                <button onClick={showNav} className='nav-btn'>
                    <FaBars />
                </button>
            </header>

            {/* <section className='section-home'>
                <p>
                    <h1>Welcome To EventMint</h1>
                </p>
                <img src='https://pngimg.com/uploads/party/party_PNG14.png'></img>
            </section>
            <image src='https://pngimg.com/uploads/party/party_PNG14.png'></image> */}
        </>
    )
}

export default NavBar;