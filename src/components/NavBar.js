
import React from 'react'

const NavBar = () => {
    return (
        <>
            <nav className='main'>
                <div className='Title'>
                    <h2>EventMint</h2>
                </div>
                <div className='menu'>
                    <ul>
                        <li>
                            <a href='#'>Home</a>
                        </li>
                        <li>
                            <a href='#'>Events</a>
                        </li>
                        <li>
                            <a href='#'>MarketPlace</a>
                        </li>
                    </ul>
                </div>
                <div className='profile'>
                    <ul>
                        <li>
                            <a href='#'>Profile</a>
                        </li>
                    </ul>

                </div>


            </nav>
            <section className='section-home'>
                <p>
                    <h1>Welcome To EventMint</h1>
                </p>
                <img src='https://pngimg.com/uploads/party/party_PNG14.png'></img>
            </section>
            <image src='https://pngimg.com/uploads/party/party_PNG14.png'></image>
        </>
    )
}

