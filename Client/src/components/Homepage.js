
import React from 'react'
import './HomePage.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Animation from './Animation'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const Homepage = ({ children }) => {
    const navigate = useNavigate();
    const navigateToEvents = () => {

        navigate('/Events');
    };
    const navigateToLogin = () => {
        navigate('/Profile');
    }
    const [ref, inView] = useInView({
        triggerOnce: true, // Only trigger once
        threshold: 0.5, // 50% of the element is in view
    });
    return (

        <>
            <main >
                <div className=" h-3/4  pr-28 ">
                    <motion.div
                        initial={{ y: 1000 }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: '2',
                            delay: '1'
                        }}
                    >
                        <div className="text-8xl font-bold pt-20 text-center text-white m-3">
                            <div className='section bg1'>
                                WELCOME TO EVENTMINT
                            </div>
                        </div>

                    </motion.div>


                    <motion.div
                        initial={{ x: -10000 }}
                        animate={{ x: 100 }}
                        transition={{
                            duration: '3',
                            delay: '2'
                        }}

                    >
                        <div className="nft-info">
                            <div>
                                <h1>
                                    NFTs —
                                </h1>
                                <h1>
                                    New, Fairer
                                </h1>
                                <h1>
                                    Ticketing.
                                </h1>
                                <h3 className='nft-sub-info'>
                                    Buy and sell NFT tickets and collectables on our transparent marketplace. Experience immersive events in a new way and be rewarded for your loyalty.
                                </h3>
                            </div>


                            <div className='nft-img-c-1'>
                                <div><img className='nft-img-1' src='https://marketplace.seatlabnft.com/static/media/microphone.5ce0e16919525f0019f0.png' /></div>
                                <div> <img className='nft-img-2' src='https://marketplace.seatlabnft.com/static/media/gym.656bb4de88f020286d74.png' /></div>
                                <div> <img className='nft-img-3' src='https://marketplace.seatlabnft.com/static/media/theatre.c379077fc18e409642fe.png' /></div>
                            </div>
                        </div>

                    </motion.div>
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 2000 }}
                        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 250 }}
                        transition={{ duration: 3, delay: 0 }}
                    >
                        {children}
                        <div className='mid-info'>
                            <h2>Revolutionise your ticketing with NFTs</h2>
                            <h2>- Sell on SeatlabNFT Today!</h2>


                        </div>
                        <div className='mid-sub-info'><h3>By using blockchain technology and NFTs, we are now at the forefront of a new era of event ticketing</h3></div>

                        <div className='nft-logo-info'>
                            <div className=' pb-16  pt-8 flex space-x-4 pl-14 pr-10 ' id='section bg2'>

                                <ul className=' h-auto  bg-black bg-opacity-35 rounded-md align-middle block' >
                                    <div className='nft-logo'>
                                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.334 60C13.9807 60 0.724609 46.569 0.724609 30C0.724609 13.431 13.9807 0 30.334 0C46.6872 0 59.9434 13.431 59.9434 30C59.9434 46.569 46.6872 60 30.334 60ZM30.334 54C36.6163 54 42.6413 51.4714 47.0836 46.9706C51.5258 42.4697 54.0215 36.3652 54.0215 30C54.0215 23.6348 51.5258 17.5303 47.0836 13.0294C42.6413 8.52856 36.6163 6 30.334 6C24.0517 6 18.0267 8.52856 13.5844 13.0294C9.14213 17.5303 6.64648 23.6348 6.64648 30C6.64648 36.3652 9.14213 42.4697 13.5844 46.9706C18.0267 51.4714 24.0517 54 30.334 54ZM19.9707 36H36.2559C36.6485 36 37.0251 35.842 37.3027 35.5607C37.5804 35.2794 37.7363 34.8978 37.7363 34.5C37.7363 34.1022 37.5804 33.7206 37.3027 33.4393C37.0251 33.158 36.6485 33 36.2559 33H24.4121C22.4489 33 20.5661 32.2098 19.1779 30.8033C17.7897 29.3968 17.0098 27.4891 17.0098 25.5C17.0098 23.5109 17.7897 21.6032 19.1779 20.1967C20.5661 18.7902 22.4489 18 24.4121 18H27.373V12H33.2949V18H40.6973V24H24.4121C24.0195 24 23.6429 24.158 23.3653 24.4393C23.0876 24.7206 22.9316 25.1022 22.9316 25.5C22.9316 25.8978 23.0876 26.2794 23.3653 26.5607C23.6429 26.842 24.0195 27 24.4121 27H36.2559C38.2191 27 40.1019 27.7902 41.4901 29.1967C42.8783 30.6032 43.6582 32.5109 43.6582 34.5C43.6582 36.4891 42.8783 38.3968 41.4901 39.8033C40.1019 41.2098 38.2191 42 36.2559 42H33.2949V48H27.373V42H19.9707V36Z" fill="white"></path></svg>
                                    </div>
                                    <div className='nft-sub-h'>
                                        Transparent Resale Market
                                    </div>
                                    <div className='nft-box-info'>
                                        Fans can resell tickets at any time at the price they choose (or below the price ceiling if set by the event organiser), creating secondary sales revenue for artists and event organisers through royalty splits.
                                    </div>

                                </ul>
                                <ul className=' h-auto  bg-black bg-opacity-35 rounded-md align-middle block mr-20' >
                                    <div className='nft-logo'>
                                        <svg width="54" height="66" viewBox="0 0 54 66" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27 0L51.2658 5.478C52.6154 5.784 53.5781 6.999 53.5781 8.406V38.367C53.5781 44.385 50.6161 50.007 45.6874 53.343L27 66L8.31262 53.343C3.38091 50.004 0.421875 44.385 0.421875 38.37V8.406C0.421875 6.999 1.38459 5.784 2.73417 5.478L27 0ZM27 6.147L6.32812 10.812V38.367C6.32812 42.378 8.30081 46.125 11.5876 48.351L27 58.791L42.4124 48.351C45.6992 46.125 47.6719 42.381 47.6719 38.37V10.812L27 6.15V6.147ZM40.1473 21.666L44.326 25.908L25.5323 45L13.0022 32.271L17.1779 28.029L25.5293 36.513L40.1473 21.663V21.666Z" fill="white"></path></svg>
                                    </div>
                                    <div className='nft-sub-h'>
                                        NFTs With Real Utility
                                    </div>
                                    <div className='nft-box-info'>
                                        All tickets and collectables are fully functional, scannable NFTs that allow users to claim whatever IRL items the artist/event organiser chooses to offer! They're tied to usernames and locked to devices to stop ticket touts from operating within our ticketing ecosystem.
                                    </div>

                                </ul>
                                <ul className=' h-auto  bg-black bg-opacity-35 rounded-md align-middle block' >
                                    <div className='nft-logo'>
                                        <svg width="56" height="54" viewBox="0 0 56 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.94141 0V48H53.3164V54H0.0195312V0H5.94141ZM51.223 9.879L55.4098 14.121L38.5117 31.242L29.6289 22.245L16.9176 35.121L12.7308 30.879L29.6289 13.758L38.5117 22.755L51.223 9.879Z" fill="white"></path></svg>
                                    </div>
                                    <div className='nft-sub-h'>
                                        Reward Fan Loyalty
                                    </div>
                                    <div className='nft-box-info'>
                                        Artists and event organisers can now airdrop resaleable and scarce digital assets for free to loyal fans, allowing them to extract real value from attending events while generating additional revenue for the issuer via royalty splits.
                                    </div>

                                </ul>
                            </div>

                        </div>

                        <div className='buttons'>
                            <div className=" space-x-3 ">
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    onHoverStart={e => { }}
                                    onHoverEnd={e => { }}
                                >
                                    <b className=" bg-black opacity-70 text-white size-5 text-center pl-4 pr-4 pt-4 pb-4 rounded-md hover:opacity-100 hover:cursor-pointer mr-4  " onClick={navigateToLogin}>Sign up Now</b>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    onHoverStart={e => { }}
                                    onHoverEnd={e => { }}
                                >
                                    <b className=" bg-black opacity-70 text-white size-5 text-center pl-4 pr-4 pt-4 pb-4 rounded-md hover:opacity-100 hover:cursor-pointer " onClick={navigateToEvents}>
                                        See All Events
                                    </b>
                                </motion.button>
                            </div>
                        </div>



                    </motion.div>
                    <motion.div

                        ref={ref}
                        initial={{ opacity: 0, x: -2000 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 250 }}
                        transition={{ duration: 3, delay: 0 }}

                    >

                    </motion.div>

                    <div className=" pt-28 pl-28 pr-10 font-semibold text-4xl text-white space-y-3 text-center">
                        <h1>How it Works?</h1>
                    </div>
                    <div className='how'>
                        <div className=' pb-16  pt-8 flex space-x-4 pl-14 pr-10 ' id='section bg2'>

                            <ul className=' h-72 pr-8 bg-black bg-opacity-35 rounded-md  align-text-top '>
                                <li className='text-white font-semibold text-center pl-8 w-72' >Start with creating your account at the E2 Blockchain Wallet</li>

                            </ul>
                            <ul className=' h-72 pr-8  bg-black bg-opacity-35 rounded-md'>
                                <li className='text-white font-semibold text-center pl-8 w-72' >Search for the event to check all details and tickets that are available for you</li>
                            </ul>
                            <ul className=' h-72 pr-8 bg-black bg-opacity-35 rounded-md'>
                                <li className='text-white font-semibold text-center pl-8 w-72' >Select the tickets you want to buy and pay for them with Stripe</li>
                            </ul>
                            <ul className=' h-72 pr-8  bg-black bg-opacity-35 rounded-md'>
                                <li className='text-white font-semibold text-center pl-8 w-72' >Go to the event and activate tickets directly in your account</li>
                            </ul>

                        </div>
                    </div>


                </div>


                {/* <div className='bg-black h-40 bg-opacity-55  ' >
                    <p className='text-left pl-9 text-xl font-medium text-white'>Contact Us :</p>
                    <p className=' my-1 text-left pl-9 text-xs font-medium text-white'><p className='font-semibold text-base'>Tele No.: </p>XXXXXXXXX</p>
                    <p className=' my-1 text-left pl-9 text-xs font-medium text-white'><p className='font-semibold text-base'>Email :</p>eventmint2023@gmail.com</p>
                </div> */}
                <Animation />
            </main>

        </>

    )

}
export default Homepage;
