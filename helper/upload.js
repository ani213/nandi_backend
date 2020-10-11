const util = require("util");
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname);
      }
  })
const fileFilter=(req,file,cb)=>{
    const match = ["image/png", "image/jpeg","image/jpg"];
    if(match.indexOf(file.mimetype) === -1){
        console.log("should be reject")
        cb(new Error("File should be Image"),false)
    }else{
        cb(null,true)
    }
}
  
var uploadFile = multer({storage: storage,limits:{fileSize:1024*1024*2},fileFilter:fileFilter}).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);

module.exports.uploadFile=uploadFilesMiddleware