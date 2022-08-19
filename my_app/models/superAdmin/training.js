const mongoose = require("mongoose");

const tranningSchema = new mongoose.Schema({
    title: {
        type: String,
        lowercase: true,
        required: [true, "Please enter the name of the Trainning"]
    },
    dateFrom: {
        type: Date,
        required: [true, "Please enter start date of the trainning"]
    },
    dateTo: {
        type: Date,
        required: [true, "Please enter the end date of the training"]
    },
    location: {
        type: String
    },
    training_pdf: {
        type: String,
        required: [true, "Please provide the training document"]
    }
})

const Tranning = mongoose.model("Tranning", tranningSchema);
module.exports = Tranning;