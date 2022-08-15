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
// "adminName": "youtube",
// "password": "$2a$12$9gGOKTu7L8h0DRbXT.ZG5.Ed4PrWuXYHej2hPwQLneBGjsG3naNZ2",
// "isAdmin": 1,
// "email": "kaartikshukla7120@gmail.com",
// 62fa4b72784b2f6024762579
// 62fa4bb4784b2f602476257a
// 62fa4bc1784b2f602476257b