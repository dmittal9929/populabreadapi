const express = require('express');
const Specials = require('../models/special');
const router = new express.Router();


router.get('/specials' , async(req,res)=>{
    try{
        const specials = await Specials.find({});
        res.send(specials)
    }catch (e) {
        res.status(500).send({error :e.message})
    }
});

module.exports = router;