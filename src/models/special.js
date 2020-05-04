const mongoose = require('mongoose');

const specialSchema = new mongoose.Schema({
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



const Specials = mongoose.model('specials',specialSchema)

module.exports = Specials;