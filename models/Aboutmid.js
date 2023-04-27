const mongoose = require('mongoose');

const AboutmidSchema = new mongoose.Schema({
  
    verticaltitle:{
        type:String,
        required:true
    },
    amtitle:{
        type:String,
        required:true
    },
    amdescription:{
        type:String,
        required:true
    },
    amimage:{
        public_id: {
            type: 'string'
        },
        url:{
            type: 'string'
        }
}

},{timestamps:true})

const AboutmidModel = mongoose.model('Aboutmid',AboutmidSchema);

module.exports = AboutmidModel


