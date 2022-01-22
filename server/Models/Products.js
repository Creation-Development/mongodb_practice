const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    name: {
        type:String,
    },
    price:{
        type:Number,
    },
    pic:{
        type:Array,
    },
    desc: {
        type:String,
    },
    feature: {
        type:Array,
    },
},{timestamps: true})

module.exports = mongoose.model("Products",productSchema)