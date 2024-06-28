const express=require('express')
const UserModel=require('../models/user.js')
const { validationResult }=require('express-validator')
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv =require("dotenv")
dotenv.config({path: "../config/.env"})



const Register = async(req,res) =>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name,email,password}=req.body;
    try{
        const userExist= await UserModel.findOne({email})
        if(userExist){
            return res.status(400).json({
                errors: [{msg:'User already exist'}],
            })
        }
    const haspassword=await bycrypt.hash(password,12)
    const newUser= new UserModel({name,email,password: haspassword})
    const result= await newUser.save()
    result._doc.password=undefined
    return res.status(201).json({success:true,...result.doc})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const Login = async(req,res) =>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    try{
        const userExist= await UserModel.findOne({email})
        if(!userExist){
            return res.status(400).json({
               errors: [{msg:'User not existed'}],
            })
        }
        const isPasswordOk= await bycrypt.compare(password,userExist.password)
        if(!isPasswordOk){
            return res.status(400).json({
                errors:[{msg: "wrong Password"}],
            })
    }

        const token=jwt.sign({_id: userExist.id},process.env.jwttoken,{expiresIn:"3d"})  

        const user= {...userExist._doc,password:undefined}
        return res.status(201).json({success:true,user,token})

    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const Auth=(req,res)=>{
    return res.status(200).json({success:true,user:{...req.user._doc}})
}



module.exports={Register,Login,Auth};

