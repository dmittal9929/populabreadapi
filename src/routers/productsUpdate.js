const express = require('express');
const auth = require('../middleware/auth');
const Products = require('../models/products');
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






router.post('/admin/product', auth, upload.single('image') , async (req,res)=>{
    if (req.file){
        try{
            //console.log(req.file.buffer);
            await datauri.format('.jpeg',req.file.buffer)
            const success = await cloudinary.uploader.upload(datauri.content);
            //console.log(req.body);
            const product = new Products({
                ...req.body,
                image:success.url
            });
            await product.save();
            res.send(product);
        }catch (e) {
            res.status(500).send({"error":e.message});
        }
    }
});


router.patch('/admin/product/:id', auth, upload.single('image'),async(req,res)=>{
    const allowedUpdates = ['name'];
    const updates = Object.keys(req.body);
    const isAllowed = updates.every((update)=>{
        return allowedUpdates.includes(update)
    });
    if(!isAllowed){
        return res.status(400).send({"error" : "update not allowed"})
    }
    try {
        const product = await Products.findById(req.params.id);
        if(req.file){
            await datauri.format(path.extname(req.file.originalname),req.file.buffer);

                const success = await cloudinary.uploader.upload(datauri.content);
                product['image'] = success.url;
            }
        if (updates.includes('name')){
            product['name'] = req.body['name'];
        }
        await product.save();
        res.send(product);
    }catch (e) {
        res.status(400).send({"error":e.message})
    }
},(error,req,res,next)=>{
    res.status(500).send(error);
});




router.get('/admin/product', auth , async(req,res)=>{
    try{
        const products  = await Products.find({});
        res.send(products);
    }
    catch (e) {
        res.send(500).send(e);
    }
});


router.delete('/admin/product/:id', auth , async (req,res)=>{
    try{
        const user =await  Products.findOneAndDelete({_id:req.params.id});
        if(!user){
            return  res.status(404).send({"error":"user not found"});
        }
        res.status(200).send(user);
    }
    catch (e) {
        res.status(400).send({"error":e.message});
    }
});




router.post('/admin/product', auth, upload.single('image') , async (req,res)=>{
    if (req.file){
        try{
            //console.log(req.file.buffer);
            await datauri.format('.jpeg',req.file.buffer);
            const success = await cloudinary.uploader.upload(datauri.content);
            const product = new Products({
                ...req.body,
                image:success.url
            });
            await product.save();
            res.send(product);
        }catch (e) {
            res.status(500).send({"error":e.message});
        }
    }
});


router.patch('/admin/product/:id', auth, upload.single('image'),async(req,res)=>{
    const allowedUpdates = ['name', 'image'];
    const updates = Object.keys(req.body);
    const isAllowed = updates.every((update)=>{
        return allowedUpdates.includes(update)
    });
    if(!isAllowed){
        return res.status(400).send({"error" : "update not allowed"})
    }
    try {
        const product = await Products.findById(req.params.id);
        if(updates.includes('image')){
            if(req.file){
                await datauri(req.file.buffer);
                const success = await cloudinary.uploader.upload(datauri.content);
                product['image'] = success.url;
            }
        }
        if (updates.includes('name')){
            product['name'] = req.body['name'];
        }
        await product.save();
        res.send(product);
    }catch (e) {
        res.status(400).send({"error":e.message})
    }
},(error,req,res,next)=>{
    res.status(500).send(error);
});




router.get('/admin/product', auth , async(req,res)=>{
    try{
        const products  = await Products.find({});
        res.send(products);
    }
    catch (e) {
        res.send(500).send(e);
    }
});


router.delete('/admin/product/:id', auth , async (req,res)=>{
    try{
        const user =await  Products.findOneAndDelete({_id:req.params.id});
        if(!user){
            return  res.status(404).send({"error":"user not found"});
        }
        res.status(200).send(user);
    }
    catch (e) {
        res.status(400).send({"error":e.message});
    }
});


module.exports = router;
