var passport = require("passport");
// var passportJWT = require("passport-jwt");
let util=require('./util')
// var ExtractJwt = passportJWT.ExtractJwt;
// var Strategy = passportJWT.Strategy;
var jwt = require('jsonwebtoken');
// var JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt; 
var config=require("./config/config.json")   
   
module.exports= function () {

    // var opts = {}
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("jwt");
    // opts.secretOrKey = 'secret';
    // // opts.issuer = 'accounts.examplesoft.com';
    // // opts.audience = 'yoursite.net';
    // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    //     util.model.User.findOne({email: jwt_payload.sub}, function(err, user) {
    //         if (err) {
    //             console.log("passport",err)
    //             return done(err, false);
    //         }
    //         if (user) {
    //             console.log("passport user",user)
    //             return done(null, user);
    //         } else {
    //             // return done(null, false);
    //             // or you could create a new account
    //             return done(new Error("you could create a new account", e), false );
    //         }
    //     });
    // }));

    return{
        initialize: function () {
            return passport.initialize();
          },
          authenticate:(req, res, next)=>{
            if(req.headers['x_csrf']&&req.headers['token']){
                _verifyToken(req.headers['x_csrf'],'x_csrf')
                .then((data)=>{
                    if(data.status){
                        _verifyToken(req.headers['token'],"token")
                        .then((data)=>{
                            if(data.status){
                                req.user=data.decoded;
                                next();
                            }else{
                                res.status(401).send({message:"Unauthorized access"})
                            }
                        })
    
                    }else{
                        res.status(401).send({message:"Unauthorized access token X_csrf"})
                    }
                })
            }else{
                res.status(401).send({message:"Unauthorized access"})
            } 
        },
        x_csrf_auth:(req,res,next)=>{
            if(req.headers['x_csrf']){
                jwt.verify(req.headers['x_csrf'],config[1].secret,(err,decoded)=>{
                    if(err){
                    res.status(401).send({message:"Unauthorized access x_csrf"})                       
                    }else{
                        if(decoded.key===config[0].key){
                           next();
                        }else{
                            res.status(401).send({message:"Unauthorized access x_csrf"})                                                  
                        }
                    }
                })
                
            }else{
                res.status(401).send({message:"Unauthorized access x_csrf"})
            }
        },
        // hasRoles:(RoleIds)=>{
        //         return (req,res,next)=>{
        //             let user=req.user;
        //             // res.send(user)
        //             let allowed=false;
        //             RoleIds.forEach((element) => {
        //                 if(element===user.role.roleId){
        //                     allowed=true
        //                 }else{
        //                     allowed=false
        //                 }
        //             });
        //             if(allowed) next()
        //             else res.status(401).send({message:"You can not access this feature"})
        //         }
        // }
  }     
}

_verifyToken=(token,info)=>{
    return new Promise((resolve,reject)=>{
        if(info==="x_csrf"){
            jwt.verify(token,config[1].secret,(err,decoded)=>{
                if(err){
                    resolve({status:false})
                }else{
                    if(decoded.key===config[0].key){
                        resolve({status:true})
                    }else{
                        resolve({status:false})
                    }
                }
            })
        }else{
            jwt.verify(token,config[1].secret,(err,decoded)=>{
                if(err){
                    resolve({status:false})
                }else{
                    resolve({status:true,decoded:decoded})
                }
            })
        }
    })
}