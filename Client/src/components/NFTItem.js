import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
const NFTItem = ({ imageSrc, title, price }) => {
  const navigate = useNavigate();
  const navigateToNFT = () => {
    navigate('/MovieDetails')
  };
  return (
    <div className="relative h-96 mb-9">
      <div className="group rounded-lg bg-black bg-opacity-15 shadow-sm shadow-black bg-opacity-25 mb-8 overflow-hidden transition-transform duration-300 ease-in-out transform relative flex flex-col">
        <div className="flex-none overflow-hidden">
          <img className="size-72 transition-transform duration-300 ease-in-out transform-gpu hover:scale-110" src={imageSrc} alt={title} />
        </div>
        <div className="flex-grow flex flex-col justify-between bg-gradient-to-t from-black to-transparent">
          <div className="p-4">
            <h1 className="font-bold text-white size-auto">{title}</h1>
            <p className="text-white font-bold font-mono">{price} ETH</p>
=======
const NFTItem = ({ imageSrc, title, price , purchase}) => {
  return (
    <div className="size-fit">
      <div className="group rounded-lg bg-black bg-opacity-15 space-y-2 shadow-sm shadow-black bg-opacity-25 mb-8 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
        <img className="size-72" src={imageSrc} alt={title} />
        <div>
          <h1 className="font-bold text-white size-auto">{title}</h1>
          <div className="pb-3 mt-2 flex space-x-3 place-items-center">
            <p className="text-white font-bold font-mono">Price-{price}</p>
            <button onClick={purchase} className="font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-full ">
              Buy NFT
            </button>
>>>>>>> 21b69d5819cfd5cc84033e27052eafc367e5f98b
          </div>
          <button className="font-semibold text-white p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 transition-opacity duration-300 opacity-0 group-hover:opacity-100 w-full"
            onClick={navigateToNFT}>
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTItem;