
import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddNFTForm from './AddNFTform';
import Sidebar from './Sidebar';

const ProfilePage = ({ name, email, username }) => {
    const navigate = useNavigate();



    const navigateToNFT = () => {
        navigate('/AddNFTform')
    };
    const navigateToAdd = () => {
        navigate('/EventForm');
    }
    return (
        <>
            <main className='flex'>
                <Sidebar />
                <div className="flex h-screen overflow-hidden w-[80%]">
                    <div className="flex-grow ">
                        <div className="container mx-auto h-screen py-8 px-4 ">
                            <div className="  rounded-lg shadow-lg overflow-hidden h-full backdrop-blur-[40px]" >
                                <div className="px-6 py-4 h-full">
                                    <h1 className="text-[50px] font-bold text-white mb-5 text-center">Profile</h1>
                                    <div className=" mb-2">
                                        <div className="flex items-center mb-10 mt-10">
                                            <span className=" text-[20px] font-semibold text-white mr-5">Name:</span>
                                            <p className="text-[20px] text-gray-800">{name}</p>
                                        </div>
                                        <hr className="border-t border-gray-200 mb-2" />
                                        <div className="flex items-center mb-10 mt-10">
                                            <span className="text-[20px] font-semibold text-white mr-2">Email:</span>
                                            <p className="text-[20px] text-gray-800">{email}</p>
                                        </div>
                                        <hr className="border-t border-gray-200 mb-10 mt-10" />
                                        <div className="flex items-center">
                                            <span className="text-[20px] font-semibold text-white mr-2">Username:</span>
                                            <p className="text-[20px] text-gray-800">{username}</p>
                                        </div>
                                    </div>
                                    <hr className="border-t border-gray-200 mb-10 mt-10" />
                                    <h2 className="text-[20px] font-semibold text-white mb-4">Activity</h2>
                                    <p className="text-gray-800">No recent activity.</p>
                                    <div className='buttons'>
                                        <div className=" space-x-3 mt-36 ">
                                            <motion.button
                                                whileHover={{ scale: 1.2 }}
                                                onHoverStart={e => { }}
                                                onHoverEnd={e => { }}
                                            >
                                                <b className=" bg-black opacity-70 text-white size-5 text-center pl-4 pr-4 pt-4 pb-4 rounded-md hover:opacity-100 hover:cursor-pointer mr-4  " onClick={navigateToNFT}>Add Your NFT</b>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.2 }}
                                                onHoverStart={e => { }}
                                                onHoverEnd={e => { }}
                                            >
                                                <b className=" bg-black opacity-70 text-white size-5 text-center pl-4 pr-4 pt-4 pb-4 rounded-md hover:opacity-100 hover:cursor-pointer " onClick={navigateToAdd}>
                                                    Add Your Event
                                                </b>
                                            </motion.button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>


        </>

    );
};

export default ProfilePage;

