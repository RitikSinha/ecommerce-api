const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        maxlength: 55,
        unique: true,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model("Category",CategorySchema)