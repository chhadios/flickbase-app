const {User}= require('../models/user_model');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.checkToken= async(req,res,next)=>{
    try{
        if(req.headers["access-token"]){
            const accessToken=req.headers["access-token"];
            const {_id,email,exp}=jwt.verify(accessToken,process.env.DB_SECRET)
            
            res.locals.userData = await User.findById(_id);
            next();
        } else{
            next();
        }
    }catch(error){
        return res.status(401).json({error:"bad token",errors:error})
    }
}

exports.checkLoggedIn =(req,res,next)=>{
    const user = res.locals.userData;
    if(!user) return res.status(401).json({error:"user  not found"})

    req.user =user;
    next();
}