import React from "react";

const Collectibles = ({ collectibles }) => {
    return (
        <div>
            <h2>Your Collectibles</h2>
            <div className="collectibles-container">
                {collectibles && collectibles.map((nft, index) => (
                    <div key={index} className="collectible-card">
                        <img src={nft.imageURL} alt={nft.title} />
                        <h3>{nft.title}</h3>
                        <p>Price: {nft.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collectibles;
