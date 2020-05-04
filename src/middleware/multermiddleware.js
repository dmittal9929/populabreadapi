const multer = require('multer');
const storage = multer.memoryStorage();
const Datauri = require('datauri');

const upload =multer({
    storage,
    limits:{
        fileSize : 1000000
    },
    fileFilter (req,file,cb){
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/i)){
            return cb(new Error('please upload image'))
        }

        cb(undefined,true);
    }
});



module.exports = upload;
