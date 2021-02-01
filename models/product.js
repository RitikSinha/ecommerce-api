const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        maxlength :55,
        trim: true,
        required: true
    },
    photo:{
        data: Buffer,
        contentType: String,
        required: true
    },
    description:{
        type : String,
        maxlength:2000,
        trim:true,
        required: true
    },
    price:{
        type: Number,
        required : true,
        trim: true
    },
    category:{
        type: ObjectId,
        ref:'Category',
    },
    stock:{
        type:Number,

    },
    sold:{
        type:Number,
        default:0,

    }
    
},{timestamps:true});

module.exports = mongoose.model('Product',ProductSchema);