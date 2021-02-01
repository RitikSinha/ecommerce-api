module.exports.signup = (req,res)=>{
    res.json({"msg":"from the controller"});
}
module.exports.signin = (req,res)=>{
    res.json({"msg":"I am sign in"});
}
module.exports.isAdmin =(req,res,next)=>{
    console.log("is admin is hit by you")
    next()
}