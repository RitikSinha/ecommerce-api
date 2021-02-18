const User = require('../models/user');
const Order = require('../models/order');


exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({err:"user not found"})
        }
        req.profile = user;
        next()
    })

}

exports.getUser = (req,res)=>{
    req.profile.encry_password = undefined;
    req.profile.salt = undefined
return res.json(req.profile);
}


exports.updateUser=(req,res)=>{
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({err:"can not update your profile!"})
            }
            user.encry_password = undefined;
            user.salt = undefined;
            return res.json(user)
        }
        )
}

exports.userPurchaseList=(req,res)=>{
Order.find({user:req.profile._id})
.populate("user" ,"_id name")
.exec((err,order)=>{
    if(err){
        return res.status(400).json({err:"no ordder found"});
    }
    return res.json(order);
})
}



exports.pushOrderInPurchaselist = (req, res , next)=>{
   let purchases = [];
   req.body.order.products.forEach(product => {
       purchases.push({
           _id : product._id,
           name: product.name,
           description: product.description,
           category: product.category,
           quantity : product.quantity,
           amount: req.body.order.amount,
           transaction_id: req.body.order
       })
   });
   User.findOneAndUpdate({_id:req.product._id},
    {$push : {purchases:purchases}},
    {new:true},(err,user)=>{
        if(err){
            return res.status(400).json({err: "Unable to save purchase list"})
        }
    })
    next()
}