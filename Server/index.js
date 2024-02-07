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
                if(err) return res.json("token is wrong")
                next();
            })
        }
     }

     app.get('/',verifyUser,(req,res)=>{
        return res.json("Success")

     })


app.post('/LoginpageNew',async (req,res)=>{
    const {email,password}=req.body;
    // const user = 
   const user = await User.findOne({email: email})
    .then(user=>{
       if(user){
          bcrypt.compare(password, user.password,(err,response)=>{
           
            if(response){
                const token=jwt.sign({email:user.email},"jwt-secret-key",{expiresIn:"1d"})
                res.cookie("token",token);
                res.json("Success")
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

















