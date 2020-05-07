const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        unique : true
    },
    image:{
        type : String
    }
},{
    timestamps: true
});



const Collaborations = mongoose.model('collaborations',collaborationSchema);

module.exports = Collaborations;