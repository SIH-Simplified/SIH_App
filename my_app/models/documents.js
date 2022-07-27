const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    teacher_id: {
        type: mongoose.ObjectId
    },
    document_url: String
})

// Not adding those ten documents

const Document = moogoose.model("Document", documentSchema);
module.exports = Document;