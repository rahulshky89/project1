const mongoose=require("mongoose");

const booking=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User", required:true},
    property:{type:mongoose.Schema.Types.ObjectId,ref:"property",required:true},
    bookedAt:{type:Date,default:Date.now()},
});

module.exports=mongoose.model("Booking",booking);