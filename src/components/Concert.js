import React from 'react'
import './Concert.css'

const Concert = () => {
    return (
        <>
            <main>
                <div className='concert-header'>
                    <img className='concert-image' src='https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-arijit-singh-concert-for-harmony-0-2023-11-19-t-6-13-41.jpg' />
                    <div className='concert-menu'>
                        <h1 className="concert-title">Arijit Singh</h1>
                        <h2 className='concert-genre'>Bollywood | Hindi | All age groups | 3hrs</h2>
                        <button className='book'>Book Now</button>
                    </div>


                </div>
                <div className='concert-about'>
                    <h1 className='concert-about-title'>About</h1>
                    <p>Guwahati is all geared up to host one of Eastern India’s biggest musical extravaganza, with Arijit Singh set to enthrall an estimated 48,000 plus crowd at the ACA Stadium, Barsapara in Guwahati on December 16, 2023.</p>
                    <p>The mega event, Arijit Singh Concert for Harmony, is being presented by Pride East Entertainments Private Limited, the region’s biggest media conglomerate, which is the promoter of News Live, the chart-topping Assamese satellite news channel.</p>
                    <p>Having delighted music lovers across the globe with his soulful and mesmerizing renditions, Arijit Singh is all set to charm the crowd with his musical magic in a grand concert in Guwahati to be hosted by Pride East Entertainments Private Limited which also runs top channels like Rang, Ramdhenu, Northeast Live and Indradhanu. </p>
                </div>
                <div className='concert-artist'>
                    <h2 className='concert-artist-title'>Artist</h2>
                    <ul>
                        <li>
                            <a href='www.google.com/Arijit-Singh'>
                                <img className='image-artist' src='https://in.bmscdn.com/Artist/1048083.jpg' />
                                <h2 className='artist-name'>Arijit Singh</h2>
                            </a>
                        </li>
                    </ul>

                </div>
            </main>


        </>
    )
}

export default Concert