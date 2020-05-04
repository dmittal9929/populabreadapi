const jwt = require('jsonwebtoken')
const Admin = require('../models/admin');


const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace("Bearer ", '');

        const decoded = jwt.verify(token,process.env.JWT_Secret);
        const user = await Admin.findOne({_id: decoded._id,'tokens.token':token });
        //console.log(decoded)
        if(!user){
            throw new Error()
        }
        req.admin = user;
        req.token = token;
        next();
    }
    catch (e) {
        res.status(401).send("error : please authenticate")
    }
}

module.exports = auth;