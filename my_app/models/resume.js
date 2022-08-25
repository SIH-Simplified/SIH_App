const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  teacher_id: mongoose.Schema.Types.ObjectId,
  Fullname: String,
  city: String,
  phone: String,
  subject: String,
  email: String,
  age: Number,
  education: String,
  skillOne: String,
  skillTwo: String,
  skillThree: String,
  about: String,
  URL: String,
  experience: String,
});

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
