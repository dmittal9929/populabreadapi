const express = require('express');
const auth = require('../middleware/auth');
const Collaborations = require('../models/collaboration');
const path = require('path');


const upload = require('../middleware/multermiddleware');
const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri');
const datauri = new Datauri();
const router = new express.Router();

require('../middleware/cloudinaryConfiguration');
// add a product
// get all products for admin
// update
//delete product







router.post('/admin/collaborations', auth, upload.single('image') , async (req,res)=>{
    if (req.file){
        try{
            //console.log(req.file.buffer);
            await datauri.format(path.extname(req.file.originalname),req.file.buffer)
            const success = await cloudinary.uploader.upload(datauri.content);
            const collaboration = new Collaborations({
                ...req.body,
                image:success.url
            });
            await collaboration.save();
            res.send(collaboration);
        }catch (e) {
            res.status(500).send({"error":e.message});
        }
    }
});


router.patch('/admin/collaborations/:id', auth, upload.single('image'),async(req,res)=>{
    const allowedUpdates = ['name', 'image'];
    const updates = Object.keys(req.body);
    const isAllowed = updates.every((update)=>{
        return allowedUpdates.includes(update)
    });
    if(!isAllowed){
        return res.status(400).send({"error" : "update not allowed"})
    }
    try {
        const collaboration = await Collaborations.findById(req.params.id);
        if(updates.includes('image')){
            if(req.file){
                await datauri.format(path.extname(req.file.originalname),req.file.buffer);
                const success = await cloudinary.uploader.upload(datauri.content);
                collaboration['image'] = success.url;
            }
        }
        if (updates.includes('name')){
            collaboration['name'] = req.body['name'];
        }
        await collaboration.save();
        res.send(collaboration);
    }catch (e) {
        res.status(400).send({"error":e.message})
    }
},(error,req,res,next)=>{
    res.status(500).send(error);
});




router.get('/admin/collaborations', auth , async(req,res)=>{
    try{
        const collaborations  = await Collaborations.find({});
        res.send(collaborations);
    }
    catch (e) {
        res.send(500).send(e);
    }
});


router.delete('/admin/collaborations/:id', auth , async (req,res)=>{
    try{
        const collaboration =await  Collaborations.findOneAndDelete({_id:req.params.id});
        if(!collaboration){
            return  res.status(404).send({"error":"user not found"});
        }
        res.status(200).send(collaboration);
    }
    catch (e) {
        res.status(400).send({"error":e.message});
    }
});


module.exports = router;
