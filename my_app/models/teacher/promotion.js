const mongoose = require("mongoose");
const promotionDB = require("../../promotion");

const promotionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  school_id: {
    type: String,
  },
  dept: {
    type: String,
  },
  current_designation: {
    type: String,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);
module.exports = Promotion;
