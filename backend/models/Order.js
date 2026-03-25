const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

items:{
type:Array,
required:true
},

subtotal:{
type:Number,
required:true
},

delivery:{
type:Number,
required:true
},

total:{
type:Number,
required:true
},

timestamp:{
type:String,
required:true
},

status:{
type:String,
default:"Preparing"
}

});

module.exports = mongoose.model("Order", OrderSchema);