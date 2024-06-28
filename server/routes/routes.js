const express=require("express")
const router=express.Router()
const {Register,Login, Auth}=require('../controller/userController.js')
const {body} =require('express-validator')
const verifyUser = require("../middleware/VerifyUser.js")
const {createContact,getContacts,getContact,updateContact,deleteContact} =require('../controller/contactController.js')

//user routes
router.post('/register',[
    body('name').trim().notEmpty().withMessage("Name should Not be empty"),
    body('email').trim().notEmpty().withMessage("Email should Not be Empty")
    .isEmail().withMessage("Invalid Email!!"),
    body('password').trim().notEmpty().withMessage("Password Should Not be Empty")
    .isLength({min:5,max:30}).withMessage("Password Length bee 5-30")
],Register)

router.post('/login',[
    body('email').trim().notEmpty().withMessage("Email should Not be Empty")
    .isEmail().withMessage("Invalid Email!!"),
    body('password').trim().notEmpty().withMessage("Password Should Not be Empty")
    .isLength({min:5,max:30}).withMessage("Password Length bee 5-30")
],Login)

router.get('/verify',verifyUser,Auth)


//contact.routes
router.post('/add-contact',verifyUser,createContact)
router.get('/contacts',verifyUser,getContacts)
router.get('/contact/:id',verifyUser,getContact)
router.put('/update-contact/:id',verifyUser,updateContact)
router.delete('/contact/:id',verifyUser,deleteContact)




module.exports=router;