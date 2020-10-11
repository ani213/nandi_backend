var mongoose = require('mongoose');  
module.exports= mongoose.connect('mongodb://localhost:27017/Nandi_sewa',
{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false ,useCreateIndex: true},(err)=>{

    if(!err){
        console.log("successfully connected")
    }
    else{
        console.log("error in database connection")
    }
})
