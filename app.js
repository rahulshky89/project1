// Load environment variables
require("dotenv").config();

//  Express import kiya
const express = require("express");
const app = express();

// ejs-mate layout engine
const ejsmate = require("ejs-mate");

//wrap error handle require
const Wrap = require("./utilis/wrapError.js");

// Path module
const path = require("path");

// Mongoose connect
const mongoose = require("mongoose");

// Models
const reviewSchema = require("./models/joiSchema.js");
const listing = require("./models/mode.js");
const Property = require("./models/propertySchema.js");
const User = require("./models/userSchema.js");
const Booking = require("./models/bookingSchema.js");
const Review = require("./models/review.js");

// Password hashing
const bcrypt = require("bcrypt");

// Sessions
const session = require("express-session");
const expresserror = require("./utilis/expresserror.js");

// Mongo store
const MongoStore = require("connect-mongo");

// DATABASE URL (Local + Render Compatible)
const dbURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/myDB";

// session Store
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: { secret: "TripleCore" },
});

// 📌 JOI Validation
const joivalidate = function (req, res, next) {
  const result = reviewSchema.validate(req.body.review);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  next();
};

// SESSION Middleware
app.use(
  session({
    store: store,
    secret: "TripleCore",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// LOGIN CHECK MIDDLEWARE
let isLogin = function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

// EJS, Static files, Body Parser
app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// 🟢 CONNECTING TO DATABASE
async function main() {
  await mongoose.connect(dbURL);
}
main()
  .then(() => console.log("MongoDB Connected ✔"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// SERVER START
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started ✔");
});

// ------------------------------------------------------------
// ROUTES
// ------------------------------------------------------------

// Home
app.get("/", function (req, res) {
  res.render("listing/index.ejs");
});

// Explore
app.get("/explore", async function (req, res) {
  const properties = await Property.find({});
  res.render("listing/explore", { properties });
});

// Show listing
app.get("/list/:id", async function (req, res) {
  const { id } = req.params;
  const property = await Property.findById(id).populate("reviews");
  res.render("listing/show", { property });
});

// Search
app.post("/search", async function (req, res) {
  try {
    let result = req.body.location;
    let property = await Property.findOne({ location: result });
    res.render("listing/search", { property });
  } catch (err) {
    res.send("Location not available.");
  }
});

// Signup
app.get("/signup", function (req, res) {
  res.render("listing/signup");
});

app.post("/signup", async function (req, res) {
  const { name, email, phone, password, userType } = req.body;
  const hashPass = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    phone,
    password: hashPass,
    userType,
  });

  res.redirect("/login");
});

// Login
app.get("/login", function (req, res) {
  res.render("listing/login");
});

app.post("/login", async function (req, res) {
  let { password, email } = req.body;
  let user = await User.findOne({ email });

  if (!user) return res.send("❌ Email not registered");

  let match = await bcrypt.compare(password, user.password);
  if (!match) return res.send("❌ Incorrect Password");

  req.session.user = {
    id: user._id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    type: user.userType,
  };

  res.redirect("/dashboard");
});

// Logout
app.get("/logout", function (req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// Dashboard
app.get("/dashboard", isLogin, async function (req, res) {
  res.render("listing/dashboard", { user: req.session.user });
});

// Profile
app.get("/profile", isLogin, function (req, res) {
  res.render("listing/profile", { user: req.session.user });
});

// Booking
app.post("/get/:id", isLogin, async function (req, res) {
  const { password } = req.body;
  const { id } = req.params;

  const user = await User.findById(req.session.user.id);
  const property = await Property.findById(id);

  if (!user || !property) return res.redirect("/login");

  const compare = await bcrypt.compare(password, user.password);
  if (!compare)
    return res.send("<script>alert('❌ Wrong password!'); window.history.back();</script>");

  if (!property.available)
    return res.send("<script>alert('❌ Property already booked!'); window.location.href='/explore';</script>");

  const booking = await Booking.create({
    user: user._id,
    property: property._id,
  });

  user.bookings.push(booking._id);
  await user.save();

  property.available = false;
  await property.save();

  res.send("<script>alert('✅ Booking confirmed!'); window.location.href='/dashboard';</script>");
});

// Bookings
app.get("/bookings", isLogin, async function (req, res) {
  const user = await User.findById(req.session.user.id).populate({
    path: "bookings",
    populate: { path: "property" },
  });

  res.render("listing/booking", { user, bookings: user.bookings });
});

// Cancel booking
app.post("/cancel-booking/:id", isLogin, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.redirect("/dashboard");

  const user = await User.findById(req.session.user.id);
  const property = await Property.findById(booking.property);

  user.bookings = user.bookings.filter(
    (b) => b.toString() !== booking._id.toString()
  );
  await user.save();

  property.available = true;
  await property.save();

  await Booking.findByIdAndDelete(booking._id);

  res.send("<script>alert('Booking Cancelled'); window.location.href='/dashboard';</script>");
});

// Review
app.post("/list/:id/review", joivalidate, async function (req, res) {
  const { id } = req.params;
  const property = await Property.findById(id);
  const Reviews = new Review(req.body.review);

  property.reviews.push(Reviews);
  await property.save();
  await Reviews.save();

  res.redirect(`/list/${id}`);
});

// Add Property (Owner)
app.post("/add-property", isLogin, async function (req, res) {
  const { owner, title, location, type, price, description, guestsAllowed, amenities, images } =
    req.body;

  const property = new Property({
    owner,
    title,
    location,
    type,
    price,
    description,
    guestsAllowed,
    amenities: amenities ? amenities.split(",") : [],
    images: images ? images.split(",") : [],
  });

  await property.save();

  res.send("<script>alert('Your property was successfully added!'); window.location.href='/explore';</script>");
});

// Owner page
app.get("/owner", isLogin, function (req, res) {
  res.render("listing/owner");
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("ERROR HANDLER:", err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500);
  return res.render("listing/error", { message: err.message });
});
