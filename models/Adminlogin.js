const mongoose = require('mongoose')


const AdminloginSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    }, 
    password:{
        type:  String,
        required: true
    }
},{timestamps:true})

const AdminloginModel = mongoose.model('Adminlogin',AdminloginSchema)


module.exports = AdminloginModel

