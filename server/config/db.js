const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config({path:"./config/.env"})


const Connection= async()=>{
    try{
        await mongoose.connect(process.env.URI)
        console.log("Connected")
    }
    catch(err){
        console.log("Error: " + err.message)
    }
}

Connection()