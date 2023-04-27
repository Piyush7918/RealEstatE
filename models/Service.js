const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  
    sertitle:{
        type:String,
        required:true
    },
    serdescription:{
        type:String,
        required:true
    }

},{timestamps:true})

const ServiceModel = mongoose.model('Service',ServiceSchema);

module.exports = ServiceModel


