const express = require('express');
const {enquiryEmail, feedback} = require('../emails/account');
const router = new express.Router();


router.post('/enquiry',async (req,res)=>{
    //console.log(req.body);
    try{
        await enquiryEmail(req.body);


        res.send();
    }
    catch (e) {
        res.status(500).send({"error":e.message})
    }
});

router.post('/feedback',(req,res)=>{
    feedback(req.body);
    res.send();
})


module.exports = router;