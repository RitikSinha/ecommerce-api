const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
    product:{
        type: ObjectId,
        ref:'Product'
    },
    count: Number,
    price : Number,
    name: String
});
const ProductCart = mongoose.model('ProductCart',ProductCartSchema);


//final order Schema
const OrderSchema = new mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{
        type: Number,
    },
    amount:{
        type:Number,
    },
    address:{
        type: String,
    },
    status:{
        type: String,
        default:"Recieved",
        enum:["Cancelled","Delivered","Shipped","Processing","Recevied"]
    },
    updated: Date,
    user:{
        type: ObjectId,
        ref:"User"
    }
},{timestamps:true});

 const Order = mongoose.model("Order", OrderSchema);

module.exports = {Order, ProductCart};