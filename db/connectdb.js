const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/RealEstatE"

//  const live_Url ="mongodb+srv://chauhanpiyush560:piyush1999@cluster0.6rkz1ig.mongodb.net/REAL_ESTATE_EXPRESSretryWrites=true&w=majority"

const connectDB = ()=>{
    return mongoose.connect(url)

    .then(()=>{
        console.log("Database Connected.....")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB