const mongoose = require('mongoose');

const AgentsSchema = new mongoose.Schema({
  
    agentname:{
        type:String,
        required:true
    },
    aboutagent:{
        type:String,
        required:true
    },
    agentphone:{
        type:String,
        required:true
    },
    agentemail:{
        type:String,
        required:true
    },
    agentimage:{
        public_id: {
            type: 'string'
        },
        url:{
            type: 'string'
        }
}

},{timestamps:true})

const AgentsModel = mongoose.model('Agents',AgentsSchema);

module.exports = AgentsModel


