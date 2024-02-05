import React from "react";

const NFTItem = ({ imageSrc, title, price }) => {
  return (
    <div className="size-fit">
      <div className="group rounded-lg bg-black bg-opacity-15 space-y-2 shadow-sm shadow-black bg-opacity-25 mb-8 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
        <img className="size-72" src={imageSrc} alt={title} />
        <div>
          <h1 className="font-bold text-white size-auto">{title}</h1>
          <div className="pb-3 mt-2 flex space-x-3 place-items-center">
            <p className="text-white font-bold font-mono">Price-{price}</p>
            <button className="font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-full ">
              Buy NFT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTItem;
