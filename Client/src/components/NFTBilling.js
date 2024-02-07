import React, { useState } from 'react';

const NFTBillingPage = () => {
    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        country: '',
        zipCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform billing logic here
        console.log('Billing info:', billingInfo);
        // Redirect or display confirmation message
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center mb-8">NFT Billing Page</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                    <input type="text" id="fullName" name="fullName" value={billingInfo.fullName} onChange={handleChange} className="form-input mt-1 block w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email Address</label>
                    <input type="email" id="email" name="email" value={billingInfo.email} onChange={handleChange} className="form-input mt-1 block w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <input type="text" id="address" name="address" value={billingInfo.address} onChange={handleChange} className="form-input mt-1 block w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-700">City</label>
                    <input type="text" id="city" name="city" value={billingInfo.city} onChange={handleChange} className="form-input mt-1 block w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="country" className="block text-gray-700">Country</label>
                    <input type="text" id="country" name="country" value={billingInfo.country} onChange={handleChange} className="form-input mt-1 block w-full" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="zipCode" className="block text-gray-700">Zip Code</label>
                    <input type="text" id="zipCode" name="zipCode" value={billingInfo.zipCode} onChange={handleChange} className="form-input mt-1 block w-full" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none">Submit Payment</button>
            </form>
        </div>
    );
};

export default NFTBillingPage;
