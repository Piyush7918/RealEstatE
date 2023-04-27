const mongoose = require('mongoose');

const ContactformSchema = new mongoose.Schema({
  
    cfemail:{
        type:String,
        required:true
    },
    cfmessage:{
        type:String,
        required:true
    },
    cfsubject:{
        type:String,
        required:true
    },
    cfname:{
        type:String,
        required:true
    },


},{timestamps:true})

const ContactformModel = mongoose.model('Contactform',ContactformSchema);

module.exports = ContactformModel


