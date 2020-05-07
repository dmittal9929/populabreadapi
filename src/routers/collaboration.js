const express = require('express');
const Collaborations = require('../models/collaboration');
const router = new express.Router();


router.get('/collaborations' , async(req,res)=>{
    try{
        const collaborations = await Collaborations.find({});
        res.send(collaborations)
    }catch (e) {
        res.status(500).send({error :e.message})
    }
});

module.exports = router;