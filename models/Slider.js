const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
  
    location:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    Simage:{
        public_id: {
            type: 'string'
        },
        url:{
            type: 'string'
        }
}

},{timestamps:true})

const SliderModel = mongoose.model('Slider',SliderSchema);

module.exports = SliderModel


