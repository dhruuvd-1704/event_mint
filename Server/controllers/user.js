const User=require('../models/user')

async function handleUserSignup(req,res){
    const {username,email,password}=req.body;
    await User.create({
        username,
        email,
        password
    })
    console.log({username,email,password})
}

module.exports={handleUserSignup}