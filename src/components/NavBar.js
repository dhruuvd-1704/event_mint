
import React from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useRef } from 'react'
import './navbar.css'
import home from './home.svg'
import event from './event.png'
import marketplace from './ethereum.png'
import profile from './profile.png'
import { Link } from 'react-router-dom'


const NavBar = () => {
    const navRef = useRef();
    const showNav = () => {
        navRef.current.classList.toggle("responsive_nav")
    }


    return (
        <>
            <header>
                <nav className='main' ref={navRef}>
                    <div className='Title'>
                        <h2>EventMint</h2>
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
                                <div>
                                    <Link to="/Events" className='event'>
                                        <img className='event-icon' src={event} /> Events
                                    </Link>
                                </div>

                            </li>
                            <li>
                                <div>
                                    <Link to="/Events" className='marketplace'>
                                        <img className='marketplace-icon' src={marketplace} />MarketPlace
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='profile'>
                        <ul>
                            <li>
                                <Link to='/Profile' className='profile-main'>
                                    <img className='profile-icon' src={profile} /> Profile
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