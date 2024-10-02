import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import NFTItem from "./NFTItem";
import Web3 from "web3";
import abi from '../ABI.json';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialNFTs = [
  // Initial NFT data can still be kept as a fallback
  {
    imageSrc: "https://i.seadn.io/s/raw/files/21c89fb23006c3d424bbe9304b0f22c4.png?auto=format&dpr=1&w=512",
    title: "Zodiac #001",
    price: "0.12",
  },
  {
    imageSrc: "https://i.seadn.io/gcs/files/db2989d36f2b7c40c019a0cceb7b3a71.png?auto=format&dpr=1&w=512",
    title: "Zodiac #002",
    price: "0.04",
  },
  {
    imageSrc: "https://i.seadn.io/s/raw/files/22085c96c432ffe169c3c1dec3c5097d.jpg?auto=format&dpr=1&w=512",
    title: "Negative 1289",
    price: "0.10",
  },
  {
    imageSrc: "https://i.seadn.io/gcs/files/9b32deeb6b59d51f1ae009af70ca56ad.png?auto=format&dpr=1&w=512",
    title: "Zodiac #003",
    price: "0.002",
  },
  {
    imageSrc: "https://i.seadn.io/gcs/files/fb402688a93652f4bebb017e6dd29f6f.png?auto=format&dpr=1&w=512",
    title: "Zodiac #004",
    price: "0.24",
  },
  {
    imageSrc: "https://i.seadn.io/s/raw/files/b1182b0883a4972e125fc1f2e159e481.png?auto=format&dpr=1&w=512",
    title: "Zodiac #005",
    price: "0.10997",
  },
  {
    imageSrc: "https://i.seadn.io/gcs/files/1951e48af9d595c231d553571acd152c.png?auto=format&dpr=1&w=512",
    title: "Zodiac #006",
    price: "0.111",
  }
];

const Marketplace = ({ onPurchaseNFT }) => {
  const location = useLocation();
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [existingNFTs, setExistingNFTs] = useState([]); // State for existing NFTs
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
      console.log("Fetched NFTs:", response.data);
      setExistingNFTs(response.data); // Update state with fetched NFTs
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  // Fetch NFTs when the component mounts
  useEffect(() => {
    fetchNFTs();
    
    // Check if the user is logged in
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:5000/MarketPlace')
      .then(result => {
        console.log(result);
        if (result.data !== "Success") {
          navigate('/LoginpageNew');
        }
      })
      .catch(error => {
        console.error("Error checking login:", error);
      });
  }, [navigate]);

  // Function to handle purchasing NFT
  // Function to handle purchasing NFT
const purchaseNFT = async (tokenId, price) => {
  try {
    if (contract) {
      const convertToWei = (amount) => {
        // Ensure amount is a string
        const cleanedAmount = String(amount).replace(/[$,]/g, "");
        return web3.utils.toWei(cleanedAmount, "ether");
      };

      const result = await contract.methods.createMarketSale(tokenId).send({
        from: accounts[0],
        value: convertToWei(price),
      });

      console.log("NFT Purchased successfully!", result);
      
      // Update purchasedNFTs in the parent component
      onPurchaseNFT({ tokenId, price, imageSrc: existingNFTs[tokenId].imageSrc });
    }
  } catch (error) {
    console.error("Error purchasing NFT:", error);
  }
};


  return (
    <main>
      <div className="mt-20 bg-gray-900 shadow-white h-72 shadow-sm">
        <h1 className="text-center pt-24 text-white font-bold text-4xl sm:text-7xl drop-shadow-xl shadow-white">
          NFT MARKETPLACE
        </h1>
      </div>

      <main className="place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ml-9 mr-9 gap-8 mt-8 mb-8">
        {/* Map over existingNFTs fetched from the backend */}
        {existingNFTs.map((item, index) => (
          <NFTItem
            key={index} // Use tokenId if available, otherwise fallback to index
            imageSrc={item.imageURL}
            title={item.title}
            price={item.price}
            purchase={() => purchaseNFT(index, item.price)}
          />
        ))}
        {/* Optionally map over initialNFTs if needed */}
        {initialNFTs.map((item, index) => (
          <NFTItem
            key={index}
            imageSrc={item.imageSrc}
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
