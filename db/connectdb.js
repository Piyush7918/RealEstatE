const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/RealEstatE"

 const live_Url ="mongodb+srv://19singhpiyush99:Piyush1999@cluster0.adanoei.mongodb.net/Real_Estate?retryWrites=true&w=majority"

const connectDB = ()=>{
    return mongoose.connect(live_Url)

    .then(()=>{
        console.log("Database Connected.....")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB