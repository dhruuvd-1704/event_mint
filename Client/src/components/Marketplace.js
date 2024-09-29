import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import NFTItem from "./NFTItem";
import Web3 from "web3";
import abi from '../ABI.json';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Marketplace = ({ onPurchaseNFT }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [nfts, setNfts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const networkId = await web3Instance.eth.net.getId();
          const contractAddress = "0x05eDD52adE292eA0A34EBa01c068D81C8EbC7BCB";
          const nftContract = new web3Instance.eth.Contract(abi, contractAddress);
          setContract(nftContract);

          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);
        } else {
          console.error("Web3 not detected");
        }
      } catch (error) {
        console.error("Error initializing web3:", error);
      }
    };

    initWeb3();
  }, []);

  // Function to fetch NFTs from the backend
  const fetchNFTs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/nfts');
      setNfts(response.data);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  // Fetch NFTs when the component mounts
  useEffect(() => {
    fetchNFTs();
  }, []);

  // Function to handle purchasing NFT
// Function to handle purchasing NFT
const purchaseNFT = async (tokenId, price) => {
    try {
        if (contract) {
            const convertToWei = (amount) => {
                // Ensure amount is a string before calling replace
                const cleanedAmount = String(amount).replace(/[$,]/g, "");
                return web3.utils.toWei(cleanedAmount, "ether");
            };
            const result = await contract.methods.createMarketSale(tokenId).send({
                from: accounts[0],
                value: convertToWei(price), // Make sure price is correctly formatted
            });

            console.log("NFT Purchased successfully!", result);
            
            // Fetch updated NFTs after purchase
            fetchNFTs();
            onPurchaseNFT({ tokenId, price });
        }
    } catch (error) {
        console.error("Error purchasing NFT:", error);
    }
};


  // Check if the user is logged in
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const result = await axios.get('http://localhost:5000/MarketPlace');
        if (result.data !== "Success") {
          navigate('/LoginpageNew');
        }
      } catch (error) {
        console.error("Error checking login:", error);
      }
    };

    checkUserLoggedIn();
  }, [navigate]);

  return (
    <main>
      <div className="mt-20 bg-gray-900 shadow-white h-72 shadow-sm">
        <h1 className="text-center pt-24 text-white font-bold text-4xl sm:text-7xl drop-shadow-xl shadow-white">
          NFT MARKETPLACE
        </h1>
      </div>

      <main className="place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ml-9 mr-9 gap-8 mt-8 mb-8">
        {/* Map over NFTs stored in state */}
        {nfts.map((item, index) => (
          <NFTItem
            key={index}
            imageSrc={item.imageURL}
            title={item.title}
            price={item.price}
            purchase={() => purchaseNFT(index, item.price)}
          />
        ))}
      </main>
    </main>
  );
};

export default Marketplace;
