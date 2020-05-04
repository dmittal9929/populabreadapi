const express = require('express');
const Products = require('../models/products');
const router = new express.Router();


router.get('/products' , async(req,res)=>{
    try{
        const products = await Products.find({});
        res.send(products)
    }catch (e) {
        res.status(500).send({error :e.message})
    }
});

module.exports = router;