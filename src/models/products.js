const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        unique : true
    },
    image:{
        type : String,
        required: true
    },
    description:{
        type : String
    },
    nvalue:{
        type : String
    },tag: {
        type: String
    }
},{
    timestamps: true
});



const Products = mongoose.model('products',productSchema);

module.exports = Products;