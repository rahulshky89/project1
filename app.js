const express=require("express");
const app=express();
const ejsmate=require("ejs-mate");
const path=require("path");
const mongoose=require("mongoose");
const listing = require("./models/mode.js");
const Property=require("./models/propertySchema.js");
const properties = require("./init/data.js");
const User = require("./models/userSchema.js");
const bcrypt = require("bcrypt");
const session=require("express-session");

// const properties = require("./init/data.js");  // yaha tumhara data file import hoga

const port=8080;

app.engine("ejs",ejsmate);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


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
       console.log("property model is  working");
    
   res.render("listing/explore",{properties});

});

//see full details route
app.get("/list/:id",async function(req,res){
   const { id } = req.params;
    console.log(id);
    
  const property=await Property.findById(id)
  
    res.render("listing/show",{property});
})
//search route
app.post("/search", async function(req,res){
    let result=req.body.location;
    let property =await Property.findOne({location:result});
    console.log(property);
    res.render("listing/search",{property});
});

//signup route rendring

app.get("/signup",function(req,res){
    res.render("listing/signup");
});
//sign-up
app.post("/signup",async function(req,res){
     const { name, email, phone, password, userType } = req.body;
     const hashPass= await bcrypt.hash(password,10);

      await User.create({
        name,
        email,
        phone,
        password:hashPass,
        userType
    });

      res.redirect("/login");
});

//log-in route rendring

app.get("/login",function(req,res){
    res.render("listing/login");
})

//log-in

app.post("/login",async function(req,res){
    let {password,email}=req.body;
    let user=await User.findOne({email});
    if(!user){
        return res.send("❌ Email not registered");
    };
    let match=await bcrypt.compare(password,user.password);
    if(!match){
        return res.send("❌ Incorrect Password");;
    }
    if(user && password){
        return res.redirect("/");
    }
});


