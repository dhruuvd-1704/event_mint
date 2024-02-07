import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import SignUpPage from './SignupPage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [invalidCredentials, setInvalidCredentials] = useState(false); // State to track invalid credentials

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/LoginpageNew', formData)
            .then(result => {
                console.log(result)
                if (result.data === "Success") {
                    navigate('/');
                } else {
                    setInvalidCredentials(true); // Set invalidCredentials state to true
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-8 bg-opacity-50 rounded-md shadow-sm shadow-black">
                    <h2 className="text-2xl font-semibold text-center text-white mb-4">
                        Login
                    </h2>
                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                    </form>
                    {invalidCredentials && (
                        <p className="text-red-500 text-center mt-2">Invalid credentials. Please try again.</p>
                    )}
                    <p className="text-center mt-4 text-white">
                        New? <Link to="/SignupPage">Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
