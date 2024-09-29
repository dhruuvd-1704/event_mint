const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const NFT = require('./models/NFT');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const connectDB = require('./db/connect');
const User = require('./models/user');
const Event = require('./models/events');

const bodyParser = require('body-parser');
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' })); // Adjust size as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`App listening to port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();

// User signup
app.post('/SignUpPage', async (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            User.create({ username, email, password: hash })
                .then(user => res.json(user))
                .catch(err => res.json(err));
        }).catch(err => console.log(err.message));
});

// Middleware to verify user
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("The token was not available!");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decode) => {
            if (err) return res.json("Token is wrong");
            next();
        });
    }
};

app.get('/', verifyUser, (req, res) => {
    return res.json("Success");
});

app.get('/MarketPlace', verifyUser, (req, res) => {
    return res.json("Success");
});

// Middleware for authentication
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    
    const jwtToken = token.replace("Bearer", "").trim();
    try {
        const isVerified = jwt.verify(jwtToken, "jwt-secret-key");
        const userData = await User.findOne({ email: isVerified.email });
        req.user = userData;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }
};

app.get('/Profile', verifyUser, async (req, res) => {
    return res.json("Success");
});

// User login
app.post('/LoginpageNew', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ username: user.username, email: user.email }, "jwt-secret-key", { expiresIn: "1d" });
                        res.cookie("token", token);
                        res.json({ msg: "Success", email: email });
                    } else {
                        res.json("The password is incorrect");
                    }
                });
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.json(err));
});

// Multer setup for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10000000
    }
});

// Starton API setup
const starton = axios.create({
    baseURL: "https://api.starton.io/v3",
    headers: {
        "x-api-key": "sk_live_0b880bdb-99ba-4537-9582-331fc09e5556",
    },
});

// Endpoint to upload and mint NFT
app.post('/Upload', upload.single('file'), async (req, res) => {
    try {
        let data = new FormData();
        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        data.append("file", blob, { filename: req.file.originalname });
        data.append("isSync", "true");

        async function uploadImageOnIpfs() {
            const ipfsImg = await starton.post("ipfs/file", data, {
                headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` }
            });
            return ipfsImg.data;
        }

        async function uploadMetadataOnIpfs(imgCid) {
            const metadataJson = {
                name: `A wonderful day`,
                description: `Probably the most awesome NFT ever created!`,
                image: `ipfs://ipfs/${imgCid}`
            };
            const ipfsMetadata = await starton.post("/ipfs/json", {
                name: "My NFT metadata Json",
                content: metadataJson,
                isSync: true
            });
            return ipfsMetadata.data;
        }

        const SMART_CONTRACT_NETWORK = "polygon-mumbai";
        const SMART_CONTRACT_ADDRESS = "0xa7B003C200C57910689D6f38bd09425078A48DFA";
        const WALLET_IMPORTED_ON_STARTON = "0xa651b1032D940c2Ec9c86567147609Ba012782cf";

        async function mintNFT(receiverAddress, metadataCid) {
            const nft = await starton.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
                functionName: "mint",
                signerWallet: WALLET_IMPORTED_ON_STARTON,
                speed: "low",
                params: [receiverAddress, metadataCid],
            });
            return nft.data;
        }

        const RECEIVER_ADDRESS = "0xC25DC4Abd092Db9c3051cfafBA7A1327a67A78a8";

        const ipfsImgData = await uploadImageOnIpfs();
        const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImgData.cid);
        const nft = await mintNFT(RECEIVER_ADDRESS, ipfsMetadata.cid);

        res.status(201).json({
            transactionHash: nft.transactionHash,
            cid: ipfsImgData.cid
        });
    } catch (error) {
        console.error("Error in uploading and minting NFT:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Endpoint to create a new event
app.post('/events', upload.single('image'), async (req, res) => {
    try {
        const newEvent = new Event({
            ...req.body,
            imageUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : ''
        });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to create event" });
    }
});

// Endpoint to get all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// Get specific event by ID
app.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all NFTs
app.get('/nfts', async (req, res) => {
    try {
        const nfts = await NFT.find(); // Use the correct model here
        const response = nfts.map(nft => ({
            _id: nft._id,
            tokenId: nft.tokenId, // Ensure this is included
            title: nft.title,
            price: nft.price,
            imageURL: nft.imageURL,
        }));
        res.json(response);
    } catch (error) {
        console.error("Error fetching NFTs:", error);
        res.status(500).send("Error fetching NFTs");
    }
});


// Endpoint to create a new NFT
app.post('/nfts', upload.single('image'), async (req, res) => {
    const { title, price, tokenId } = req.body; // Include tokenId
    const imageURL = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';

    try {
        const newNFT = new NFT({ title, price, imageURL, tokenId }); // Ensure tokenId is included
        await newNFT.save();
        res.status(201).json(newNFT);
    } catch (error) {
        res.status(500).json({ message: "Error adding NFT", error });
    }
});


