const mongoose = require('mongoose');

const AbouttopSchema = new mongoose.Schema({
  
    companyname:{
        type:String,
        required:true
    },
    subtitle:{
        type:String,
        required:true
    },
    atimage:{
        public_id: {
            type: 'string'
        },
        url:{
            type: 'string'
        }
}

},{timestamps:true})

const AbouttopModel = mongoose.model('Abouttop',AbouttopSchema);

module.exports = AbouttopModel


