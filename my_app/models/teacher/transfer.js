const mongoose = require("mongoose");
const transferDB = require("../../transferDB");

const transferSchema = new mongoose.Schema({
  school_type: {
    type: String,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  present_school: {
    type: String,
    required: true,
  },
  present_district: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  current_designation: {
    type: String,
    required: true,
  },
  date_of_joining: {
    type: String,
  },
  marital_status: {
    type: String,
    required: true,
  },
});

const transfer = mongoose.model("Transfer", transferSchema);
module.exports = transfer;
