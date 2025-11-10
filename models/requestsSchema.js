const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    renter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    preferredLocation: String,
    budgetRange: String,                 // Example: "3000-6000"
    roomType: { type: String, enum: ["PG", "Hostel", "Room", "Flat"] },
    preferredSharing: String,            // Example: "Single", "Double", "Triple"
    additionalNotes: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RoomRequest", requestSchema);
