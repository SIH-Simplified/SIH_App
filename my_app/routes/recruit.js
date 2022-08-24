const express = require("express");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
  res.render("recruitment/dashboard");
});

router.get("/introduction", (req, res) => {
  res.render("/recruitment/intro");
});
module.exports = router;
