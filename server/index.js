const express=require("express")
const dotenv =require("dotenv")
const cors=require('cors')
const db=require('./config/db.js')
const Router=require('../server/routes/routes.js')

dotenv.config({path: "../config/.env"})


const app=express()
app.use(express.json())
app.use(cors())

app.use('/CMS',Router)

app.listen(process.env.PORT,()=>{
    console.log("App is Running")
})