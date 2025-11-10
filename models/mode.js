const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    name:String,
    image:{
        filename:{
        type:String,
        default:"my photo",
    },
    url:{
        type:String,
    }
    }
})
const listing=mongoose.model("listing",listingSchema);
module.exports=listing;