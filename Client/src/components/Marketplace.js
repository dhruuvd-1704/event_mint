import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NFTItem from "./NFTItem";
import Web3 from "web3";
import abi from '../ABI.json';
import axios from "axios";

const Marketplace = ({ onPurchaseNFT }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [nfts, setNfts] = useState([]);
  const navigate = useNavigate();

  // Initialize Web3 and the smart contract
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request account access
          setWeb3(web3Instance);

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

  // Fetch NFTs from the server
  const fetchNFTs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/nfts');
      console.log("Fetched NFTs:", response.data);
      setNfts(response.data);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  // Function to handle purchasing NFT
  const purchaseNFT = async (tokenId, price) => {
    try {
      if (contract && accounts.length > 0) {
        const convertToWei = (amount) => {
          const cleanedAmount = String(amount).replace(/[$,]/g, "");
          return web3.utils.toWei(cleanedAmount, "ether");
        };
  
        const valueInWei = convertToWei(price);
  
        // Log the tokenId, price, and converted value for debugging
        console.log("TokenId:", tokenId);
        console.log("Price:", price);
        console.log("Value in Wei:", valueInWei);
  
        const result = await contract.methods.createMarketSale(tokenId).send({
          from: accounts[0],
          value: valueInWei, // Ensure value is correctly formatted
        });
  
        console.log("NFT Purchased successfully!", result);
        fetchNFTs(); // Refresh the NFT list
        onPurchaseNFT({ tokenId, price });
      } else {
        console.error("Contract or account not set.");
      }
    } catch (error) {
      console.error("Error purchasing NFT:", error);
    }
  };
  

  // Function to add NFT to MetaMask wallet
  const addNFTToWallet = async (tokenId) => {
    const tokenAddress = "0x05eDD52adE292eA0A34EBa01c068D81C8EbC7BCB";
    const tokenURI = await contract.methods.tokenURI(tokenId).call();

    const asset = {
      type: 'ERC721',
      options: {
        address: tokenAddress,
        tokenId: tokenId,
        symbol: 'YOUR_TOKEN_SYMBOL', // Replace with your token's symbol
        decimals: 0,
        image: 'YOUR_IMAGE_URL', // Optional: Add the image URL for the NFT
        description: 'YOUR_DESCRIPTION', // Optional: Add a description for the NFT
        name: 'YOUR_NFT_NAME' // Optional: Add the NFT name
      },
    };

    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: asset,
      });

      if (wasAdded) {
        console.log('NFT added to MetaMask!');
      } else {
        console.log('NFT not added to MetaMask.');
      }
    } catch (error) {
      console.error('Failed to add NFT to MetaMask:', error);
    }
  };

  // Check if the user is logged in
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

      <div className="place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ml-9 mr-9 gap-8 mt-8 mb-8">
        {nfts.map((item, index) => {
          console.log("NFT Item:", item); // Log each item
          if (!item.tokenId) {
            console.warn(`NFT Item at index ${index} does not have a tokenId:`, item);
          }
          return (
            <NFTItem
              key={item.tokenId || index} // Ensure tokenId is defined, fall back to index
              imageSrc={item.imageURL}
              title={item.title}
              price={item.price}
              purchase={() => purchaseNFT(item.tokenId, item.price)} // Pass the correct tokenId
              addToWallet={() => addNFTToWallet(item.tokenId)} // Add function to add NFT to wallet
            />
          );
        })}
      </div>
    </main>
  );
};

export default Marketplace;
