const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, "Please provide a admin username"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isAdmin: {
        type: Number,
        min: [0, "Privilage cannot be lower than level 0"],
        max: [2, "Privilage level cannot be greater than level 2"],
        required: true,
        default: 1
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email id"]
    }
})

// To know more about isAdmin feild look in the admin.md file in the root directory

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;