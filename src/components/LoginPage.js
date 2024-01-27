// // LoginPage.js

// import React, { useState } from 'react';


// const LoginPage = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         password: '',
//     });

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // In a real application, perform authentication logic here
//         // For demonstration purposes, we're just showing an alert
//         alert(`Logging in with ${formData.username}`);
//     };

//     return (
//         <main className='bg-[url("F:\web dev practice\styles\EventMint\public\bg.jpg")]  h-https://images.yourstory.com/cs/1/eb1786d0-a7a9-11e9-b510-6f7c0abb0d14/audience-band-celebration-22634361567750376859.jpg?fm=png&auto=format    h-max '>


//             <div div className="min-h-screen flex items-center justify-center bg-gradient-to-r " >
//                 <div className="bg-white  p-8 rounded-md shadow-md w-full sm:w-96">
//                     <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
//                         Welcome To EventMint!
//                     </h1>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label htmlFor="username" className="block text-sm font-medium text-gray-600">
//                                 Username
//                             </label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div className="flex items-center justify-center">
//                             <button
//                                 type="submit"
//                                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-400"
//                             >
//                                 Login
//                             </button>
//                         </div>
//                     </form>
//                     <p className="mt-4 text-gray-600 text-sm text-center">
//                         Don't have an account?{' '}
//                         <a href="#" className=" text-blue-400  hover:underline font-semibold text-sm">
//                             Sign up
//                         </a>
//                     </p>
//                 </div>
//             </div >
//         </main >

//     );
// };

// export default LoginPage;
// LoginForm.js
// LoginForm.js
// LoginForm.js
// LoginForm.js

import React, { useState } from 'react';
// import loginImage from './login-image.jpg'; // Replace with the path to your image

const LoginForm = () => {
    const [loginMode, setLoginMode] = useState(true);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleSwitchMode = () => {
        setLoginMode((prevMode) => !prevMode);
        setFormData({ username: '', email: '', password: '' });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
                {/* Your website content goes here */}


                {/* Login form */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-8 bg-opacity-50 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold text-center text-white mb-4">
                        {loginMode ? 'Login' : 'Sign Up'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {!loginMode && (
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
                                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-gray-200 placeholder-gray-500"
                                />
                            </div>
                        )}
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
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-gray-200 placeholder-gray-500"
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
                                className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-gray-200 placeholder-gray-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                        >
                            {loginMode ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    <p
                        onClick={handleSwitchMode}
                        className="text-center mt-4 text-blue-300 cursor-pointer"
                    >
                        {loginMode ? 'Create an account' : 'Already have an account? Login'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
