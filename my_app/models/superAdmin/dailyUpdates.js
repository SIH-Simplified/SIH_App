const mongoose = require("mongoose");

const dailyUpdatesSuperAdminSchema = new mongoose.Schema({
    district: {
        type: String,
        lowercase: true,
        required: [true, "Please specify district name"]
    },
    posterName: {
        type: String,
        lowercase: true,
        required: [true, "Please specify the name of the poster of this update"],
        trim: true,
    },
    postDate: {
        type: Date,
        default: Date.now(),
        required: [true, "Please specify the date of the post"]
    },
    post: {
        type: String,
        required: [true, "Please specify content of the post"],
        minLength: 10,
        trim: true,
    }
})

// Write a middleware before saving a document for converting date from millisecond to DD/MM/YYYY formate

const SuperAdminDailyUpdate = mongoose.model("SuperAdminDailyUpdate", dailyUpdatesSuperAdminSchema);
module.exports = SuperAdminDailyUpdate;