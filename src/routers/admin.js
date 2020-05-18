const express = require('express');
const Admin = require('../models/admin');
const router  = new express.Router();
const auth = require('../middleware/auth');
// create new admin
// login admin
// logout admin
// logout from all devices
// get current admin profile
// get all admin profiles
// update password
// remove admin


// router.post('/admin/firstAdmin' ,async(req,res)=>{
//     const admin = new Admin(req.body);
//     try{
//         const user = await admin.save();
//         res.status(201).send(user)
//     }catch (e) {
//         res.status(500).send(e)
//     }
// });

router.post('/admin/newadmin',auth ,async(req,res)=>{
    const admin = new Admin(req.body);
    try{
        const user = await admin.save();
        res.status(201).send(user)
    }catch (e) {
        res.status(500).send(e)
    }
});

router.get('/admin/me',auth, async(req,res)=>{
    res.send(req.admin);
});

router.post('/admin/login',async(req,res)=>{
    try{
        const admin = await Admin.findByCredentials(req.body.email,req.body.password);
        const token = await admin.generateToken();
        res.status(200).send({admin,token})
    }catch (e) {
        res.status(400).send({"error":e.message});
    }

});

router.post('/admin/logout',auth,async(req,res)=>{
    req.admin.tokens = req.admin.tokens.filter((token)=>{
        return (token.token != req.token)
    })
    try{
        await req.admin.save();
        res.send();
    }
    catch (e) {
        res.status(400).send(e)
    }
});

router.post('/admin/logoutAll', auth  ,async (req,res)=>{
    req.admin.tokens = [];
    try{
        await req.admin.save();
        res.send({"msg":"successful"})
    }catch (e) {
        res.status(400).send(e);
    }
})

router.patch('/admin/me', auth ,async (req,res)=>{
    const Allowedupdates = ['password'];
    const updates = Object.keys(req.body);
    const isvalid = updates.every((update)=> Allowedupdates.includes(update));
    if (!isvalid){
        return res.status(400).send({"error":"invalid updates operation"})
    }
    try{
        updates.forEach((update)=>{
            req.admin[update] = req.body[update]

        })
        await req.admin.save();
        res.send(req.admin);
    }catch (e) {
        res.status(400).send(e)
    }
});

router.get('/admin/allAdmin',auth, async (req,res)=>{
    try{
        const admins = await Admin.find({});
        res.send(admins);
    }catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/admin/removeAdmin/:id' ,auth ,async(req,res)=>{
    try{
        const user =await Admin.findOneAndDelete({_id:req.params.id})
        if (!user){
            return res.status(404).send()
        }
        res.send(user);
    }
    catch (e) {
        res.status(400).send(e)
    }
});





module.exports = router;