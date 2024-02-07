import React, { useState } from 'react';

const MovieDetails = ({ posterUrl, title, description }) => {
    const [quantity, setQuantity] = useState(1);

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increment = () => {
        setQuantity(quantity + 1);
    };

    const handleMintNow = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    console.log('Connected account:', accounts[0]);
                    // Perform minting logic here
                })
                .catch((error) => {
                    console.error('Error connecting to MetaMask:', error);
                });
        } else {
            console.error('MetaMask is not installed');
            alert('Metamask is not installed');
        }
    };

    return (
        <main className='flex justify-center items-center min-h-screen bg-transparent'>
            <div className='flex bg-transparent p-8 rounded-lg shadow-lg'>
                <img
                    src={posterUrl}
                    alt='Movie Poster'
                    className='rounded-lg mb-8 shadow-md'
                    style={{ width: '500px', height: '500px' }}
                />
                <div className='flex flex-col ml-8'>
                    <h1 className='text-3xl font-bold text-white mb-10 m-10'>{title}</h1>
                    <p className='text-gray-300 text-lg max-w-[500px] mb-10'>
                        {description}
                    </p>
                    <div className='flex items-center justify-center'>
                        <button className='text-white py-2 px-4 hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none' onClick={decrement}>
                            -
                        </button>
                        <input
                            type='number'
                            className='bg-transparent text-white w-16 px-2 py-1 text-center focus:outline-none'
                            value={quantity}
                            readOnly
                            style={{ fontSize: '1rem', fontWeight: 'bold' }}
                        />
                        <button className='text-white py-2 px-4 hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none' onClick={increment}>
                            +
                        </button>
                        <button className='bg-blue-500 text-white py-2 px-6 mt-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none ml-5 ' onClick={handleMintNow}>Mint Now</button>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default MovieDetails;
