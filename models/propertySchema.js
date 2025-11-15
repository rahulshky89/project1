const mongoose = require("mongoose");
const Review=require("./review");
const Schema = mongoose.Schema;

const propertySchema = new mongoose.Schema({
    owner: { type:String },
    title: { type: String, required: true },          // Example: "PG for Boys" / "AC Deluxe Room"
    type: { type: String, enum: ["PG", "Hostel", "Room", "Flat"], required: true },
    location: { type: String, required: true },       // City/Locality
    description: String,
    price: Number,                                    // Monthly rent
    guestsAllowed: Number,                            // 1 / 2 / 3 se kitne reh sakte h
    amenities: [String],                              // e.g ["WiFi","Parking","Laundry"]
    images: [String],                                 // URLs or filenames
    available: { type: Boolean, default: true },      // Booked hai ya available
    createdAt: { type: Date, default: Date.now },
    reviews:[{type:Schema.Types.ObjectId,ref:"Review"}]
});

module.exports = mongoose.model("property", propertySchema);
