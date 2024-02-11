const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
// const {v4: uuidv4}=require('uuid')
// const {setUser}=require('./service/auth')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')
// const userRoute=require('./routes/user')
// const handleUserSignup=require('./controllers/user')
require('dotenv').config()
const connectDB=require('./db/connect')
const User=require('./models/user')
const multer = require('multer')
const axios = require('axios')
 

// app.use(userRoute)
// Apply CORS middleware before defining routes
// app.use(cors({
//     origin: 'http://localhost:3000', // Adjust this to match your frontend origin
//     methods: 'GET,POST,PUT,DELETE', // Specify the allowed HTTP methods
//     allowedHeaders: 'Content-Type,Authorization', // Specify the allowed request headers
// }));
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"], 
    credentials:true
}))

app.use(express.json());
app.use(cookieParser())



const port = process.env.PORT || 5000

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`app listening to port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}

start()


app.post('/SignUpPage', async (req,res)=>{
    const {username,email,password}=req.body;
    bcrypt.hash(password,10)
    .then(hash=>{
        User.create(
          {username,email,password:hash}         )                                                                                                 
         .then(user=>res.json(user)) 
         .catch(err=>res.json(err))

    }).catch(err=>console.log(err.message))
   
     })

     const verifyUser = (req,res,next)=>{
        const token=req.cookies.token;
        // console.log(token);
        if(!token){
            return res.json("The token was not avalilable!")
        }else{
            jwt.verify(token,"jwt-secret-key",(err,decode)=>{
                if(err) return res.json("token is wrong");
                // req.user =decoded;
                next();
            })
        }
     }

     app.get('/',verifyUser,(req,res)=>{
        return res.json("Success")

     })

     app.get('/MarketPlace',verifyUser,(req,res)=>{
        return res.json("Success")

     })

    //  app.get('/Profile',verifyUser,(req,res)=>{
    //     const email = req.user.email;
    //     const username = req.user.username;
    //     return res.json({msg:"Success",email:email,username:username})

    //  })

    const authMiddleware=async (req, res, next)=>{
        const token=req.header("Authorization");
        if(!token)
           return res.status(401).json({message:"Unauthorized HTTP,Token not provided"}) ;
        //    console.log("Token from auth middleware",token)
        const jwtToken = token.replace("Bearer","").trim() ;
     
        // console.log("Token from auth middleware",jwtToken)
        try{
            const isVerified=jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRocnV2LjE3IiwiZW1haWwiOiJnZXRidXR0ZXJmbHlAZ21haWwuY29tIiwiaWF0IjoxNzA3NTg2NjYwLCJleHAiOjE3MDc2NzMwNjB9.x3xK6zFCeom0uAc80bzZJHr9uYWj099DeSONhCOkyfE","jwt-secret-key");
            console.log(isVerified)
            const userData = await User.findOne({email: isVerified.email})
            console.log(userData);
            req.user=userData;
            
            
          
           next();
        }
        catch(error){
            console.log(error)
            return res.status(401).json({message:"Unauthorized. Invalid token"})
        }


    }

    app.get('/Profile', verifyUser , async (req, res) => {
        // try {
        //     // Access user data from the request object
        //     const userData = req.user;
    
        //     // Send the user data as a response
        //     return res.status(200).json({ msg: "Success", userData });
        // } catch (error) {
        //     // Handle any errors that occur
        //     console.error("Error in retrieving user profile:", error);
        //     return res.status(500).json({ error: "Internal Server Error" });
        // }
        return res.json("Success")
    });
    


app.post('/LoginpageNew',async (req,res)=>{
    const {email,password}=req.body;
    // const user = 
    const user = await User.findOne({email: email})
    .then(user=>{
       if(user){
          bcrypt.compare(password, user.password,(err,response)=>{
           
            if(response){
                const token=jwt.sign({username:user.username , email:user.email},"jwt-secret-key",{expiresIn:"1d"})
                res.cookie("token",token);
                res.json({msg:"Success",email:email})
            }else{
                res.json("The password is incorrect")
            }
          })
        }
        else{ res.json("No record existed")

        }
    })
    // .then({return res.redirect('/')}).
    .catch(err=>res.json(err))

    // if(!user){console.log("Invalid credentials")}                                                     
})


const upload = multer({
    limits:{
       fileSize:10000000
    }
})

const starton = axios.create({
    baseURL:"https://api.starton.io/v3",
    headers:{
        "x-api-key":"sk_live_0b880bdb-99ba-4537-9582-331fc09e5556",
    },
})

// app.post('/Upload',cors(),upload.single('file'),async(req,res)=>{
//     let data = new FormData();
//     const blob = new Blob([req.file.buffer],{type:req.file.mimetype});
//     data.append("file",blob,{filename:req.file.originalname})
// data.append("isSync","true")

// async function uploadImageOnIpfs(){
//     const ipfsImg=await starton.post("ipfs/file",data,{
//         headers: {"Content-Type":`multipart/form-data; boundary=${data._boundary}`}
//     })
//     return ipfsImg.data ;
// }
// async function uploadMetadataOnIpfs(imgCid){
//     const metadataJson={
//         name:`A wonderful day`,
//         description:`Probably the most awesome nft ever created !`,
//         image:`ipfs://ipfs/${imgCid}`
//     }
//     const ipfsMetadata=await starton.post("/ipfs/json",{
//         name:"My NFT metadata Json",
//         constent: metadataJson,
//         isSync: true
//     })
//     return ipfsMetadata.data;
// }

// const SMART_CONTRACT_NETWORK="polygon-mumbai"
// const SMART_CONTRACT_ADDRESS="0xa7B003C200C57910689D6f38bd09425078A48DFA"
// const WALLET_IMPORTED_ON_STARTON="0xa651b1032D940c2Ec9c86567147609Ba012782cf"
// async function mintNFT(receiverAddress,metadataCid){
//     const nft = await starton.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
//         functionName: "mint",
//         signerWallet: WALLET_IMPORTED_ON_STARTON,
//         speed: "low",
//         params: [receiverAddress, metadataCid],
//     })
//     return nft.data;
// }


// const RECEIVER_ADDRESS ="0xC25DC4Abd092Db9c3051cfafBA7A1327a67A78a8"
// const ipfsImgData=await uploadImageOnIpfs();
// const ipfsMetadata=await uploadMetadataOnIpfs(ipfsImgData.cid);
// // console.log(ipfsImgData,ipfsMetadata)
// // res.status(201).json({cid:ipfsImgData.id})
// const nft = await mintNFT(RECEIVER_ADDRESS,ipfsMetadata.cid)
// console.log(nft)
// res.status(201).json({
//     transactionHash:nft.transactionHash,
//     cid:ipfsImgData.cid
// })
// })






// )
// app.post('/LoginpageNew', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email, password });
//         if (user) {
//             // If user is found, redirect to '/Events'
//             res.redirect('/Events');
//         } else {
//             // If user is not found, send error response
//             res.status(401).json({ error: "Invalid credentials" });
//         }
//     } catch (err) {
//         // Handle any error that occurred during database query
//         res.status(500).json({ error: err.message });
//     }
// });



// app.post('/Upload', cors(), upload.single('file'), async (req, res) => {
//     try {
//         let data = new FormData();
//         const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
//         data.append("file", blob, { filename: req.file.originalname });
//         data.append("isSync", "true");

//         async function uploadImageOnIpfs() {
//             const ipfsImg = await starton.post("ipfs/file", data, {
//                 headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` }
//             });
//             return ipfsImg.data;
//         }

//         async function uploadMetadataOnIpfs(imgCid) {
//             const metadataJson = {
//                 name: `A wonderful day`,
//                 description: `Probably the most awesome nft ever created !`,
//                 image: `ipfs://ipfs/${imgCid}`
//             };
//             const ipfsMetadata = await starton.post("/ipfs/json", {
//                 name: "My NFT metadata Json",
//                 constent: metadataJson,
//                 isSync: true,
//             });
//             return ipfsMetadata.data;
//         }

//         const SMART_CONTRACT_NETWORK = "polygon-mumbai";
//         const SMART_CONTRACT_ADDRESS = "0xa7B003C200C57910689D6f38bd09425078A48DFA";
//         const WALLET_IMPORTED_ON_STARTON = "0xa651b1032D940c2Ec9c86567147609Ba012782cf";

//         async function mintNFT(receiverAddress, metadataCid) {
//             const nft = await starton.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
//                 functionName: "mint",
//                 signerWallet: WALLET_IMPORTED_ON_STARTON,
//                 speed: "low",
//                 params: [receiverAddress, metadataCid],
//             });
//             return nft.data;
//         }

//         const RECEIVER_ADDRESS = "0xC25DC4Abd092Db9c3051cfafBA7A1327a67A78a8";
//         const ipfsImgData = await uploadImageOnIpfs();
//         const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImgData.cid);
//         const nft = await mintNFT(RECEIVER_ADDRESS, ipfsMetadata.cid);

//         res.status(201).json({
//             transactionHash: nft.transactionHash,
//             cid: ipfsImgData.cid
//         });
//     } catch (error) {
//         console.error("Error in uploading and minting NFT:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });






app.post('/Upload', cors(), upload.single('file'), async (req, res) => {
    try {
        // Prepare FormData object for file and metadata
        let data = new FormData();
        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        data.append("file", blob, { filename: req.file.originalname });
        data.append("isSync", "true");

        // Function to upload image to IPFS
        async function uploadImageOnIpfs() {
            const ipfsImg = await starton.post("ipfs/file", data, {
                headers: { "Content-Type": `multipart/form-data; boundary=${data._boundary}` }
            });
            return ipfsImg.data;
        }

        // Function to upload metadata to IPFS
        async function uploadMetadataOnIpfs(imgCid) {
            const metadataJson = {
                name: `A wonderful day`,
                description: `Probably the most awesome nft ever created !`,
                image: `ipfs://ipfs/${imgCid}`
            };
            const ipfsMetadata = await starton.post("/ipfs/json", {
                name: "My NFT metadata Json",
                content: metadataJson, // Corrected misspelling of "content"
                isSync: true
            });
            return ipfsMetadata.data;
        }

        // Function to mint NFT
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

        // Receiver address for the NFT
        const RECEIVER_ADDRESS = "0xC25DC4Abd092Db9c3051cfafBA7A1327a67A78a8";

        // Upload image to IPFS
        const ipfsImgData = await uploadImageOnIpfs();

        // Upload metadata to IPFS
        const ipfsMetadata = await uploadMetadataOnIpfs(ipfsImgData.cid);

        // Mint NFT
        const nft = await mintNFT(RECEIVER_ADDRESS, ipfsMetadata.cid);

        // Respond with transaction hash and CID
        res.status(201).json({
            transactionHash: nft.transactionHash,
            cid: ipfsImgData.cid
        });
    } catch (error) {
        console.error("Error in uploading and minting NFT:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

















