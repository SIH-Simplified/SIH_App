const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    teacher_id: {
        type: mongoose.ObjectId
    },
    resume: {
        type: String
    },
    portfolio: {
        type: String
    }
})

// Not adding those ten documents

const Document = moogoose.model("Document", documentSchema);
module.exports = Document;