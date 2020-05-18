const express = require('express');
const {enquiryEmail, feedback} = require('../emails/account');
const router = new express.Router();


router.post('/enquiry',async (req,res)=>{
    //console.log(req.body);
    try{
        await enquiryEmail(req.body);


        res.send({"msg":"Recorded your response"});
    }
    catch (e) {
        res.status(500).send({"err":"internal serer error"})
    }
});

router.post('/feedback',async (req,res)=>{
    try{
        await feedback(req.body);
        res.send({"msg":"Recorded your response"});
    }
    catch (e) {
        res.status(500).send({"err":"internal serer error"})
    }

})


module.exports = router;