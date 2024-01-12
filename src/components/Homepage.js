import React from 'react'
import "./navbar.css"
import home from './home.svg'
import event from './event.png'
import marketplace from './ethereum.png'
import profile from './profile.png'

const Homepage = () => {
    return (<body className="bg-[url(https://images.yourstory.com/cs/1/eb1786d0-a7a9-11e9-b510-6f7c0abb0d14/audience-band-celebration-22634361567750376859.jpg?fm=png&auto=format)]  h-https://images.yourstory.com/cs/1/eb1786d0-a7a9-11e9-b510-6f7c0abb0d14/audience-band-celebration-22634361567750376859.jpg?fm=png&auto=format    h-max ">

        <nav className='main bg-black bg-opacity-55  '>
            <div className='Title'>
                <h2>EventMint</h2>
            </div>
            <div className='menu'>
                <ul>

                    <li>
                        <a href='#' className='home'>
                            <img className='home-icon' src={home} /> Home
                        </a>
                    </li>
                    <li>
                        <a href='#' className='event'>
                            <img className='event-icon' src={event} /> Events
                        </a>
                    </li>
                    <li>
                        <a href='#' className='marketplace'>
                            <img className='marketplace-icon' src={marketplace} />Marketplace
                        </a>
                    </li>
                </ul>
            </div>
            <div className='profile'>
                <ul>
                    <li>
                        <a href='#' className='profile-main'>
                            <img className='profile-icon' src={profile} /> Profile
                        </a>
                    </li>
                </ul>

            </div>


        </nav>

        <main className='bg-white  h-max bg-opacity-10'>




            <div className=" h-3/4  pr-28 ">

                <div className="text-8xl font-bold pt-20 text-center text-white">
                    WELCOME TO EVENTMINT
                </div>
                <div className="pl-28 pt-10  space-x-3">
                    <b className=" bg-black opacity-70 text-white size-5 text-center pl-4 pr-4 pt-4 pb-4 rounded-md hover:opacity-100 hover:cursor-pointer  ">Sign up Now</b>
                    <b className=" bg-black opacity-70 text-white size-5 text-center pl-4 pr-4 pt-4 pb-4 rounded-md hover:opacity-100 hover:cursor-pointer ">
                        See All Events
                    </b>


                </div>
                <div className=" pt-28 pl-28 pr-10 font-semibold text-4xl text-white space-y-3">
                    <h1>How it Works?</h1>
                </div>
                <div className=' pb-16  pt-8 flex space-x-4 pl-14 pr-10 '>

                    <ul className=' h-72 pr-8 bg-black bg-opacity-70 rounded-md  align-text-top '>
                        <li className='text-white font-semibold text-center pl-8 w-72' >Start with creating your account at the E2 Blockchain Wallet</li>

                    </ul>
                    <ul className=' h-72 pr-8  bg-black bg-opacity-75 rounded-md'>
                        <li className='text-white font-semibold text-center pl-8 w-72' >Search for the event to check all details and tickets that are available for you</li>
                    </ul>
                    <ul className=' h-72 pr-8 bg-black bg-opacity-75 rounded-md'>
                        <li className='text-white font-semibold text-center pl-8 w-72' >Select the tickets you want to buy and pay for them with Stripe</li>
                    </ul>
                    <ul className=' h-72 pr-8  bg-black bg-opacity-75 rounded-md'>
                        <li className='text-white font-semibold text-center pl-8 w-72' >Go to the event and activate tickets directly in your account</li>
                    </ul>

                </div>
            </div>


            <div className='bg-black h-40 bg-opacity-55  ' >
                <p className='text-left pl-9 text-xl font-medium text-white'>Contact Us :</p>
                <p className=' my-1 text-left pl-9 text-xs font-medium text-white'><p className='font-semibold text-base'>Tele No.: </p>XXXXXXXXX</p>
                <p className=' my-1 text-left pl-9 text-xs font-medium text-white'><p className='font-semibold text-base'>Email :</p>eventmint2023@gmail.com</p>
            </div>



        </main>
    </body>
    )

}

export default Homepage
