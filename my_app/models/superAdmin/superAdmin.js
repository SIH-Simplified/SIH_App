const mongoose = require("mongoose");
// const email = require("./email");

const superAdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide email of admin"],
        unique: true
    },
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
        default: 2
    },
    sentEmails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Email",
    }]
})

// To know more about isAdmin feild look in the admin.md file in the root directory

const SuperAdmin = mongoose.model("SuperAdmin", adminSchema);
module.exports = SuperAdmin;