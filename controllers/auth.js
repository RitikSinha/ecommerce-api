const User = require('../models/user');
const { validationResult, cookie } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

module.exports.signup = (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array()[0].msg });
    }
    const user = new User(req.body);
    user.save((err,data)=>{
        if(err){
            return res.status(400).json({err:"not able to sign up!"})
        }
       return res.json({
            name: data.name,
            email: data.password,
            id : data._id
        });
    })
    
    
}
module.exports.signin = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({err:errors.array()[0].msg})
    }
    const { email, password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err||!user){
            return res.status(400).json({err:"user not found"})
        }
        if(!user.authenticate(password)){
            return res.status(400).json({err:"password not matched"})
        }
        const token = jwt.sign({_id: user._id},process.env.SECRET);
        res.cookie("token",token,{expire: new Date() + 99})
        const { _id , email, name, role} =user;
        return res.json({token:token,user:{_id,email,name,role}});

    })
    
}

module.exports.signout = (req,res)=>{
    //signout with cookies
    res.clearCookie("token")
   return res.json({msg:"signed out"});
}
module.exports.isAdmin =(req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({err:"ACCESS DENIED! YOU ARE NOT ADMIN"})
    }
    next()
}
module.exports.isAuthenticated = (req,res,next)=>{
let checker = req.profile && req.auth && req.profile._id == req.auth._id;
if(!checker){
    return res.status(403).json({
        err: "ACCESS DENIED"
    })   
}
next();
}
module.exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty:"auth"
});