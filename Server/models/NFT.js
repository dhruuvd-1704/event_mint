const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
  tokenId: { type: String, required: true } // Add this line
});

const NFT = mongoose.model('NFT', nftSchema);

module.exports = NFT;
