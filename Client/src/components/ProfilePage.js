// import React from 'react';
// const ProfilePage = () => {
//     return (
//         <div className="flex h-screen overflow-hidden w-[80%]">
//             <div className="flex-grow ">
//                 <div className="container mx-auto h-screen py-8 px-4 ">
//                     <div className="  rounded-lg shadow-lg overflow-hidden h-full backdrop-blur-[40px]" >
//                         <div className="px-6 py-4 h-full">
//                             <h1 className="text-[50px] font-bold text-gray-800 mb-5 text-center">Profile</h1>
//                             <div className=" mb-2">
//                                 <div className="flex items-center mb-10 mt-10">
//                                     <span className=" text-[20px] font-semibold text-gray-600 mr-5">Name:</span>
//                                     <p className="text-[20px] text-gray-800">John Doe</p>
//                                 </div>
//                                 <hr className="border-t border-gray-200 mb-2" />
//                                 <div className="flex items-center mb-10 mt-10">
//                                     <span className="text-[20px] font-semibold text-gray-600 mr-2">Email:</span>
//                                     <p className="text-[20px] text-gray-800">johndoe@example.com</p>
//                                 </div>
//                                 <hr className="border-t border-gray-200 mb-10 mt-10" />
//                                 <div className="flex items-center">
//                                     <span className="text-[20px] font-semibold text-gray-600 mr-2">Wallet Address:</span>
//                                     <p className="text-[20px] text-gray-800">0x123abc...</p>
//                                 </div>
//                             </div>
//                             <hr className="border-t border-gray-200 mb-10 mt-10" />
//                             <h2 className="text-[20px] font-semibold text-gray-800 mb-4">Activity</h2>
//                             <p className="text-gray-600">No recent activity.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;

import React from 'react';

const ProfilePage = ({ name, email, walletAddress }) => {
    return (
        <div className="flex h-screen overflow-hidden w-[80%]">
            <div className="flex-grow ">
                <div className="container mx-auto h-screen py-8 px-4 ">
                    <div className="  rounded-lg shadow-lg overflow-hidden h-full backdrop-blur-[40px]" >
                        <div className="px-6 py-4 h-full">
                            <h1 className="text-[50px] font-bold text-gray-800 mb-5 text-center">Profile</h1>
                            <div className=" mb-2">
                                <div className="flex items-center mb-10 mt-10">
                                    <span className=" text-[20px] font-semibold text-gray-800 mr-5">Name:</span>
                                    <p className="text-[20px] text-gray-800">{name}</p>
                                </div>
                                <hr className="border-t border-gray-200 mb-2" />
                                <div className="flex items-center mb-10 mt-10">
                                    <span className="text-[20px] font-semibold text-gray-800 mr-2">Email:</span>
                                    <p className="text-[20px] text-gray-800">{email}</p>
                                </div>
                                <hr className="border-t border-gray-200 mb-10 mt-10" />
                                <div className="flex items-center">
                                    <span className="text-[20px] font-semibold text-gray-800 mr-2">Wallet Address:</span>
                                    <p className="text-[20px] text-gray-800">{walletAddress}</p>
                                </div>
                            </div>
                            <hr className="border-t border-gray-200 mb-10 mt-10" />
                            <h2 className="text-[20px] font-semibold text-gray-800 mb-4">Activity</h2>
                            <p className="text-gray-600">No recent activity.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
