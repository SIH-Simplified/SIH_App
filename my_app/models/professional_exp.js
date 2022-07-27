const mongoose = require("mongoose");

const proSchema = new mongoose.Schema({
    teacher_id: mongoose.Schema.Types.ObjectId,
    start_date: mongoose.Schema.Types.Date,
    end_date: mongoose.Schema.Types.Date,
    job_details: String
})

const ProModel = mongoose.model("Professional_experience", proSchema);
module.exports = ProModel;