const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  
    plocation:{
        type:String,
        required:true
    },
    pareas:{
        type:String,
        required:true
    },
    pbaths:{
        type:String,
        required:true
    },
    pbeds:{
        type:String,
        required:true
    },
    pgarages:{
        type:String,
        required:true
    },
    pprice:{
        type:String,
        required:true
    },
    pdescription:{
        type:String,
        required:true
    },
    amenities:{
        type:String,
        required:true
    },
    pimage:[

    ],

    fimage:{
        public_id: {
            type: 'string'
        },
        url:{
            type: 'string'
        }
    }

},{timestamps:true})

const PropertyModel = mongoose.model('Property',PropertySchema);

module.exports = PropertyModel


