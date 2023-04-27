const mongoose = require('mongoose');

const TestimonialsSchema = new mongoose.Schema({
  
    clientname:{
        type:String,
        required:true
    },
    clientfeedback:{
        type:String,
        required:true
    },
    clientimage:{
        public_id: {
            type: 'string'
        },
        url:{
            type: 'string'
        }
}

},{timestamps:true})

const TestimonialsModel = mongoose.model('Testimonials',TestimonialsSchema);

module.exports = TestimonialsModel


