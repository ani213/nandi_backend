const mongoose=require('mongoose');

module.exports=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    filePath:{
        type:String,
    }
})