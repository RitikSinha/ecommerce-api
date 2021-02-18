
const {Order,ProductCart} = require('../models/order');


exports.getOrderById = (req,res,next,id)=>{
   Order.findById(id).populate("products.product","name price")
   .exec((err,order)=>{
       if(err){
           return res.status(400).json({
               err: "order not found!"
           });
       }
       req.order = order;
       next();
   }) 
}
exports.createOrder = (req,res)=>{
    req.body.order.profile = req.profile;
    let order = new Order(req.body.order);
    order.save((err,ord)=>{
        if(err){
            return res.status(400).json({err:"order not placed!"});
        }
        return res.json(ord);
    })
}
exports.getAllOrders =(req,res)=>{
    Order.find({}).populate("user","_id name")
    .exec((err,ord)=>{
        if(err){
            return res.status(400).json({
                err : "could not find order"
            });
        }
        return res.json(ord);

    })
}

exports.getOrderStatus = (req,res)=>{
   return  res.json(Order.schema.path("status").enumValues);
}

exports.updateOrderStatus = (req,res)=>{
    Order.updateOne({_id:req.body.orderId},
            {$set:{status: req. body.status}},
            (err,order)=>{
                if(err){
                    return res.status(400).json({
                        err : "Cannot update order status!"
                    });

                }
                res.json(order);
            }
        )
}
