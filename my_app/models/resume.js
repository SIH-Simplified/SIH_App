const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  teacher_id: mongoose.Schema.Types.ObjectId,
  Fullname: String,
  city: String,
  phone: String,
  email: String,
  age: Number,
  education: String,
  employment_status: Boolean,
  skills: {
    type: [String],
  },
  additional_info: String,
  URL: String,
  professional_exp: [mongoose.Schema.Types.ObjectId],
});

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
