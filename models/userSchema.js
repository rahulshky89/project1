const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ["renter", "owner"], default: "renter" },
     bookings: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Booking" }
  ]
});

module.exports = mongoose.model("User", userSchema);

