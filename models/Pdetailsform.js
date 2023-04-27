const mongoose = require('mongoose');

const PdetailsformSchema = new mongoose.Schema({
  
    pdemail:{
        type:String,
        required:true
    },
    pdcomment:{
        type:String,
        required:true
    },
    pdhouseid:{
        type:String,
        required:true
    },
    pdname:{
        type:String,
        required:true
    },


},{timestamps:true})

const PdetailsformModel = mongoose.model('Pdetailsform',PdetailsformSchema);

module.exports = PdetailsformModel


