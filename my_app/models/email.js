const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: [true, "Please insert a sender of the message"]
    },
    subject: {
        type: String,
        required: [true, "Please insert a subject of the message in the email"]
    },
    message: {
        type: String,
        required: [true, "Please insert a subject of the message in the email"]
    }
})

const Email = mongoose.model("Email", emailSchema);
module.exports = Email;