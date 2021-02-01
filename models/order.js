const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const ProductCartSchema = new mongoose.model({
    product:{
        type: ObjectId,
        ref:'Product'
    },
    count: Number,
    price : Number,
    name: String
});
const Product = mongoose.model('Product',ProductCartSchema);


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
    updated: Date,
    user:{
        type: ObjectId,
        ref:"User"
    }
},{timestamps:true});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, Product};