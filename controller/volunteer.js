var common=require('../common')
var util=require('../util')
var jwt = require('jsonwebtoken');
var config=require('../config/config.json')
var path=require('path');
var fs=require("fs");
var upload=require('../helper/upload')
var logger=require("../logger/volunteerLogger")
var validation=require('./validation')
_generateToken=(opt,expiresIn)=>{
    return jwt.sign(opt, config[1].secret, { expiresIn: expiresIn });
}
module.exports.me=(req,res)=>{ 
    res.send({x_csrf:_generateToken(config[0],'10h')})
}

// module.exports.changeKeySecret=(req,res)=>{

//     var filePath = path.normalize(__dirname + '/../config/' + 'config.json');
//     var salt=common.salt();
//    let data=[
//        {
//            key:_generateToken(config[0],'30m')
//        },{
//            secret:common.encryptPassword(salt,salt)
//        }
//    ]
//     fs.writeFile(filePath,JSON.stringify(data),{flag:'w'},(err)=>{
//         if(err){
//             res.status(400).send({message:err})
//         }else{
//             res.send({message:"success"})
//         }
//     })
// }

module.exports.createVolunteer= async (req,res)=>{
   try{ 
        await upload.uploadFile(req,res)
        let volunteerData= await validation.volunteerValidate.validateAsync(req.body)
        if(req.file){
            volunteerData.filePath=req.file.path
        }
        util.model.Volunteer.create(volunteerData)
        .then((data)=>{
            res.status(200).send(data)
        })
        .catch((err)=>{
            logger.volunteerLogger.error(err)
            res.status(400).send({message:err.message})
        })
   }catch(err){
        if(err.message==="File too large")
        {   logger.volunteerLogger.error(err)
            res.status(400).send({message:"File is too large. File should be maximum 2MB"})
        }else{
        logger.volunteerLogger.error(err)
        res.status(400).send({message:err.message})
        }
   }
}
