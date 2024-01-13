// LoginPage.js

import React, { useState } from 'react';
import './navbar.css'
import home from './home.svg'
import event from './event.png'
import marketplace from './ethereum.png'
import profile from './profile.png'
const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // In a real application, perform authentication logic here
        // For demonstration purposes, we're just showing an alert
        alert(`Logging in with ${formData.username}`);
    };

    return (
        <main className='bg-[url(https://images.yourstory.com/cs/1/eb1786d0-a7a9-11e9-b510-6f7c0abb0d14/audience-band-celebration-22634361567750376859.jpg?fm=png&auto=format)]  h-https://images.yourstory.com/cs/1/eb1786d0-a7a9-11e9-b510-6f7c0abb0d14/audience-band-celebration-22634361567750376859.jpg?fm=png&auto=format    h-max '>
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

            <div div className="min-h-screen flex items-center justify-center bg-gradient-to-r " >
                <div className="bg-white p-8 rounded-md shadow-md w-full sm:w-96">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                        Welcome To EventMint!
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-gray-600 text-sm text-center">
                        Don't have an account?{' '}
                        <a href="#" className=" text-blue-400  hover:underline font-semibold text-sm">
                            Sign up
                        </a>
                    </p>
                </div>
            </div >
        </main >

    );
};

export default LoginPage;
