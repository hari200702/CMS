const jwt=require('jsonwebtoken')
const UserModel=require('../models/user.js')
const dotenv =require("dotenv")
dotenv.config({path: "../config/.env"})



const VerifyUser= (req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token= authHeader.split(" ")[1];
        jwt.verify(token ,process.env.jwttoken ,async (err, payload)=>{
            try{
            if(err){
                return res.status(401).json({error: "Unauthorized"})
            }
            const user = await UserModel.findOne({_id: payload._id}).select("-password")
            req.user=user;
            next()

        }catch(err){
            res.status(500).json({error: err.message})
        }
        })
    }else{
        return res.status(403).json({erro: "Forbidden"})
    }
}


module.exports=VerifyUser;