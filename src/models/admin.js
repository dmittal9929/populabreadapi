const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email :{
        type: String,
        unique: true,
        required: true,
        trim :true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Enter valid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength : 8,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('Enter a different password')
            }
        }
    },
    tokens:[{
        token:{
            type : String,
            required : true
        }
    }]
});


adminSchema.pre( 'save',async function(next) {
    const user = this;
    //console.log(user.isModified('password'))
    if (user.isModified('password')){
        user.password = await  bcrypt.hash(user.password,8)
    }
    next();
});





adminSchema.statics.findByCredentials = async (email,password)=>{
    const user = await Admin.findOne();
    if (!user){
        throw new Error("unable to login")
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch){
        throw new Error("unable to login")
    }
    return user

};


adminSchema.methods.toJSON = function (){
    const admin = this;
    const adminOblect = admin.toObject();
    delete adminOblect.password;
    delete adminOblect.tokens;
    return adminOblect
}

adminSchema.methods.generateToken = async function(){
        const admin = this;
        const token = await jwt.sign({_id:admin._id},process.env.JWT_Secret,{expiresIn: 60*60});
        admin.tokens = admin.tokens.concat({token});
        await admin.save();
        return token;
}

const Admin  = mongoose.model('admin',adminSchema);

module.exports =Admin;
