import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const {username,email,password}=formData;
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Sign Up Form submitted:', formData);
        axios.post('http://localhost:5000/SignUpPage',{username,email,password })
        .then(result=>{console.log(result)
        navigate('/')})
        .catch(err=>console.log(err))
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-8 bg-opacity-50 rounded-md shadow-sm shadow-black">
                    <h2 className="text-2xl font-semibold text-center text-white mb-4">
                        Sign Up
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-200 mb-1">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-gray-500 bg-opacity-20 shadow-lg text-gray-200 placeholder-gray-100 backdrop-blur-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-200 mb-1">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-gray-500 bg-opacity-20 shadow-lg text-gray-200 placeholder-gray-100 backdrop-blur-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-200 mb-1">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-gray-500 bg-opacity-20 shadow-lg text-gray-200 placeholder-gray-100 backdrop-blur-lg"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center mt-4 text-white">
                        Already have an account? <Link to="/LoginpageNew">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

