import React,{useState,useEffect} from "react";
import NFTItem from "./NFTItem";
import Web3 from "web3";
import abi from '../ABI.json';


const nftItems = [
  {
    imageSrc: "https://tse4.mm.bing.net/th?id=OIP.0BLUPEUYgRbRu1-ZmrFe6wHaHa&pid=Api&P=0&h=180",
    title: "FIFA WORLD CUP SEASON PASS",
    price: "$0.09",
  },
  {
    imageSrc: "https://preview.redd.it/india-vs-pakistan-in-world-cup-2023-will-be-played-on-15th-v0-yxdnss9eicza1.jpg?auto=webp&s=c7389aa5ea0e463d2f839fae7db2d3f41f9fa74f",
    title: "INDIA VS PAKISTAN MATCH TICKET",
    price: "$0.06",
  },
  {
    imageSrc: "https://www.patriot-place.com/wp-content/uploads/2023/01/Ed-Sheeran-2023-square-2.jpg",
    title: "Ed Sheeran Mathematics Tour",
    price: "$0.03",
  },
  
];

const Marketplace = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Connect to MetaMask or other web3 provider
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable(); // Request account access if needed
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

  const purchaseNFT = async (tokenId, price) => {
    try {
    if (contract) {
      // Helper function to clean up the price string
      const convertToWei = (amount) => {
        // Remove dollar sign and comma
        const cleanedAmount = amount.replace(/[$,]/g, "");
        // Convert to wei
        return web3.utils.toWei(cleanedAmount, "ether");
      };
      // Your purchase logic here
      const result = await contract.methods.createMarketSale(tokenId).send({
        from: accounts[0],
        value: convertToWei(price),
      });

      console.log("NFT Purchased successfully!", result);
    } else {
      console.error("Contract not initialized");
    }
  }catch (error) {
      console.error("Error purchasing NFT:", error);
    }
  };
  return (
    <main>
      <div className="mt-20 bg-gray-900 shadow-white h-72 shadow-sm">
        <h1 className="text-center pt-24 text-white font-bold text-7xl drop-shadow-xl shadow-white">
          NFT. MARKETPLACE
        </h1>
      </div>

      <main className="place-items-center grid grid-cols-4 mt-24 ">
        {/* Iterate over the list of NFT items */}
        {nftItems.map((item, index) => (
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
