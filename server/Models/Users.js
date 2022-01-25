const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    fullname: {
        type:String,
    },
    email: {
        type:String
    },
    phone: {
        type:Number
    },
    pic:{
        type:Array
    },
    pass: {
        type:String
    },
    conpass: {
        type:String
    }
},{timestamps: true})

module.exports = mongoose.model("Users",userSchema)