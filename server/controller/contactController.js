const express=require('express')
const Contactmodel=require('../models/Contact.js')



const createContact = async(req,res)=>{
    const{name,email,phone,address}=req.body

    try{
        const newContact=new Contactmodel({
            name,
            email,
            phone,
            address,
            postedBy: req.user._id
        })
    
        const result= await newContact.save()
        return res.status(201).json({success:true,...result._doc})

    }catch(err){
        return res.status(500).json(err.message)
    }
}

const getContacts = async (req,res)=>{
    try{
        const contacts= await Contactmodel.find({postedBy: req.user._id})
        return res.status(200).json({success: true,contacts})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const getContact = async (req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.status(401).json({error:"No Id specified"}) 
    }
    try{
        const contacts= await Contactmodel.findOne({_id: id})
        return res.status(200).json({success: true,...contacts._doc})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const updateContact = async (req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.status(401).json({error:"No Id specified"}) 
    }
    try{
        const result= await Contactmodel.findByIdAndUpdate({_id:id},{...req.body},{new:true})
        return res.status(200).json({success: true,...result._doc})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

const deleteContact = async (req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.status(401).json({error:"No Id specified"}) 
    }
    try{
        const contact= await Contactmodel.findOne({_id: id})
        if(!contact){
            return res.status(401).json({error:"No Recored exited"}) 
        }
        const deleteRecord= await Contactmodel.findByIdAndDelete({_id: id})
        const contacts= await Contactmodel.find({postedBy: req.user._id})
        return res.status(200).json({success: true,contacts})
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}



module.exports={createContact,getContacts,getContact,updateContact,deleteContact};