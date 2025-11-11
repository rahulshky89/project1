const express=require("express");
const app=express();
const ejsmate=require("ejs-mate");
const path=require("path");
const mongoose=require("mongoose");
const listing = require("./models/mode.js");
const Property=require("./models/propertySchema.js");
// const properties = require("./init/data.js");  // yaha tumhara data file import hoga

const port=8080;

app.engine("ejs",ejsmate);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));


async function main(){
    await  mongoose.connect("mongodb://127.0.0.1:27017/myDB");
}

main().then(function(){
    console.log("mongoDB is started");
});


app.listen(port,function(){
    console.log("Server is started----");
})
app.get("/",function(req,res){
   res.render("listing/index.ejs");

});
//explore route
app.get("/explore",async function(req,res){
    
        const properties= await Property.find({});
       console.log(properties[0]);
    
   res.render("listing/explore",{properties});

});



