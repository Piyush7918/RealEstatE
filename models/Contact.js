const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  
    cemail:{
        type:String,
        required:true
    },
    cphone:{
        type:String,
        required:true
    },
    caddress:{
        type:String,
        required:true
    }

},{timestamps:true})

const ContactModel = mongoose.model('Contact',ContactSchema);

module.exports = ContactModel


