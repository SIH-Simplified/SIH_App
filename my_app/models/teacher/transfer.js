const mongoose = require("mongoose");
const transferDB = require("../../transferDB");

const transferSchema = new mongoose.Schema({
  school_type: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  gender: {
    type: String,
  },
  mobile_number: {
    type: String,
  },
  email: {
    type: String,
  },
  dob: {
    type: Date,
  },
  present_school: {
    type: String,
  },
  present_district: {
    type: String,
  },
  subject: {
    type: String,
  },
  current_designation: {
    type: String,
  },
  date_of_joining: {
    type: String,
  },
  marital_status: {
    type: String,
  },
  choice: {
    type: String,
  },
});

const transfer = mongoose.model("Transfer", transferSchema);
module.exports = transfer;
