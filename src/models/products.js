const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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



const Products = mongoose.model('products',productSchema)

module.exports = Products