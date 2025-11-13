const express=require("express");
const app=express();
const ejsmate=require("ejs-mate");
const path=require("path");
const mongoose=require("mongoose");
const listing = require("./models/mode.js");
const Property=require("./models/propertySchema.js");
const properties = require("./init/data.js");
const User = require("./models/userSchema.js");
const Booking = require("./models/bookingSchema.js");
const bcrypt = require("bcrypt");
const session=require("express-session");

// const properties = require("./init/data.js");  // yaha tumhara data file import hoga

const port=8080;
//session midleware
app.use(session({
    secret:"TripleCore",
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*48}
}));
//session middleware-end

//islogin function start
let isLogin=function(req,res,next){
  if(!req.session.user){
    res.redirect("/login");
  };
    next();
};
//islogin function end
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
    
    try{let property =await Property.findOne({location:result});
    console.log(property);
    res.render("listing/search",{property});}
    catch(err){
        console.log("OOPS ! Location That you Enter Was Not Available Currently Please Try Another Time Thankyou for Visiting Our Website.")
    }
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
});

//dashboard render
app.get("/dashboard",async function(req,res){
    if(!req.session.user){
        res.redirect("/login");
    }
    res.render("listing/dashboard",{user:req.session.user})
})
//dashboard render end

//log-in
app.post("/login",async function(req,res){
    let {password,email}=req.body;
    let user=await User.findOne({email});
    if(!user){
        return res.send("❌ Email not registered");
    };
    let match=await bcrypt.compare(password,user.password);
    if(!match){
        return res.send("❌ Incorrect Password");
    }

    req.session.user={
    id: user._id,
    name: user.name,
    email: user.email,
    type: user.userType
    };
    res.redirect("/dashboard");
});

//logout route

app.get("/logout",function(req,res){
    req.session.destroy;
     res.redirect("/login");
});
//profile route
app.get("/profile",function(req,res){
    if(!req.session.user){
        res.redirect("/login");
    }
    res.render("listing/profile",{user:req.session.user});
});

//get route
app.post("/get/:id",isLogin,async function(req,res){
    const {password}=req.body;
    const {id}=req.params;
    console.log(id);
    const user=await User.findById(req.session.user.id);
      const property=await Property.findById(id);
      console.log("this is a user property",property);
    const compare=await bcrypt.compare(password,user.password);

    if(!user || !property){
        return res.redirect("/login");
    }
    //booking check
    if(!property.available){
      return res.send("<script>alert('❌ Property already booked!'); window.location.href='/explore';</script>");
    };

    //booking create
    const booking=await Booking.create({
        user:user._id,
        property:property._id,
    });
    //booking push in user
    user.bookings.push(booking._id);
    await user.save();

    //add properties unavailable
    property.available=false;
    await property.save();

    if(!compare){
        return res.send("<script>alert('❌ Wrong password!'); window.history.back();</script>");
    }
     res.send("<script>alert('✅ Booking confirmed!'); window.location.href='/dashboard';</script>");
});
//explore search get

app.post("/search/:id", async function(req,res){
    let id=req.params.id;
    console.log(id);
    let property =await Property.findById(id);
    console.log(property);
    res.render("listing/search",{property});
    
});

//boking route and populate

app.get("/bookings", isLogin, async function(req, res) {
  const user = await User.findById(req.session.user.id)
    .populate({
      path: "bookings",
      populate: { path: "property" }
    });

  res.render("listing/booking", {
    user: user,
    bookings: user.bookings 
  });
});