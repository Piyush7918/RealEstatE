const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/RealEstatE"

 const live_Url ="mongodb+srv://chauhanpiyush560:piyush123@cluster0.6rkz1ig.mongodb.net/realestate?retryWrites=true&w=majority"

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