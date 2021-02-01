const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 35,
        trim: true
    },
    userinfo: {
        type: String,
        maxlength: 100,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    encry_password:{
        type:String,
        required: true
    },
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    },
    salt:{
        type:String,
        required:true
    }

},{timestamps:true});

//creating virtual field
userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encry_password =this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

//creating methods to encrypt password 
//and authenticate users

userSchema.methods = {
    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHmac("sha256",this.salt)
                            .update(plainpassword)
                            .digest('hex');
        }
        catch(err){
            return ""
        }
    },
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;
    }
}
module.exports = mongoose.model("User",userSchema);