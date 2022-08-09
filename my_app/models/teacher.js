const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    teacher_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String
    },
    phone_number: {
        type: String
    },
    age: {
        type: Number
    },
    education: String,
    skills: {
        type: Array
    },
    about: {
        type: String
    },
    documents: {
        type: mongoose.Schema.Types.ObjectId
    },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;