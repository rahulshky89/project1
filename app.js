//  Express import kiya
// app banaya — ye hi main server object hai.
const express=require("express");
const app=express();


// ejs-mate layout engine — header/footer ko include karne ke liye.
const ejsmate=require("ejs-mate");

//wrap error handle require
const Wrap=require("./utilis/wrapError.js");

//  File paths handle karne ke liye built-in module.
const path=require("path");

//mongoose ko connect krna
const mongoose=require("mongoose");

//databases connectins
const reviewSchema = require("./models/joiSchema.js");
const listing = require("./models/mode.js");
const Property=require("./models/propertySchema.js");
const User = require("./models/userSchema.js");
const Booking = require("./models/bookingSchema.js");
const Review=require("./models/review.js");

//password ko hash krna
const bcrypt = require("bcrypt");

//user ko session s login krwana aur store  rkhna
const session=require("express-session");

//custom error k liye class express ko require krna
const expresserror=require("./utilis/expresserror.js");

//ab jab user sessionm store hua h to usse mongoDB m store karaa d taaki baar baar hate na
const Mongostore=require("connect-mongo");

// const properties = require("./init/data.js");  // yaha tumhara data file import hoga

//mongo-connect session is connect for  mongoDB for using liberary of connect-mongo
const store=Mongostore.create({
  mongoUrl:"mongodb://127.0.0.1:27017/myDB",
  crypto:{
    secret:"TripleCore",
  },
   
});
//joi middleware
const joivalidate=function(req,res,next){
  const result=reviewSchema.validate(req.body.review);
  if(result.error){
    return res.status(400).send(error.details[0].message);
  };
  next();
}

const port=8080;
//session midleware
app.use(session({
  store:store,
    secret:"TripleCore",
    resave:false,
    saveUninitialized:false,
    cookie:{
      httpOnly:true,
      maxAge:1000*60*60*24*7}
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

//EJS, Static files, Body Parser
app.engine("ejs",ejsmate);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


async function main(){
    await  mongoose.connect("mongodb://127.0.0.1:27017/myDB");
}

main().then(function(){
  console.log("mongoDB was started ----------------");
})
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
    
  const property=await Property.findById(id).populate("reviews");
  
    res.render("listing/show",{property});
})
//search route
app.post("/search", async function(req,res){
    let result=req.body.location;
    let {checkin}=req.body;

    console.log(checkin);
    
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
  name: name,
  email: email,
  phone: phone,
  password: hashPass,
  userType: userType
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
    phone:user.phone,
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
 

    if(!user || !property){
        return res.redirect("/login");
    }
    //compare password
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.send("<script>alert('❌ Wrong password!'); window.history.back();</script>");
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



//cancel route
app.post("/cancel-booking/:id", isLogin, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.redirect("/my-bookings");

  const user = await User.findById(req.session.user.id);
  const property = await Property.findById(booking.property);

  // remove from user's bookings list
  user.bookings = user.bookings.filter(b => b.toString() !== booking._id.toString());
  await user.save();

  // mark property available again
  property.available = true;
  await property.save();

  // delete booking
  await Booking.findByIdAndDelete(booking._id);

  res.send("<script>alert('Booking Cancelled'); window.location.href='/dashboard';</script>");
});

//post review route

app.post("/list/:id/review",joivalidate,async function(req,res){
  const {id}=req.params;
  const property=await Property.findById(id);
  const Reviews=new Review(req.body.review);
  
  property.reviews.push(Reviews);
    await property.save();
    await Reviews.save();
    
   res.redirect(`/list/${id}`);
})
//owner post
app.post("/add-property",isLogin,async function(req,res){
  const { owner,title, location, type, price,description,guestsAllowed,amenities,images } = req.body;
   const property= new Property({
         owner:owner,
         title:title,
         location:location,
         type:type,
         price:price,
         description:description,
         guestsAllowed:guestsAllowed,
         amenities:amenities ? amenities.split(","):[],
         images:images ? images.split(",") : []
   });

   await property.save();

   
   
res.send("<script>alert('your property was succesfully add WOW !!'); window.location.href='/explore';</script>");

});
//owner listing route
app.get("/owner",isLogin,function(req,res){
    res.render("listing/owner");
});
//error middlleware
app.use((err, req, res, next) => {
  console.error("ERROR HANDLER:", err);

  if (res.headersSent) {
    return next(err);
  }
  
  res.status(err.status || 500);

  
  return res.render("listing/error", {message: err.message });
  
});