const { check, validatorResult } = require("express-validator");
const Resume = require("../models/resume");
const portfolioDB = require("../portfolioDB");
const express = require("express");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
  res.render("resume-1");
});

router.get("/portfolio-2", (req, res) => {
  res.render("resume-2");
});

router.post(
  "/portfolio-2/send",
  [
    check("phone", "Please enter a valid phone number").isMobilePhone(),
    check("email", "Please enter a valid email").isEmail(),
    check("age", "Please enter a valid age").isLength({
      min: 1,
      max: 3,
    }),
  ],
  (req, res) => {
    const {
      Fullname,
      city,
      phone,
      email,
      age,
      subject,
      education,
      skillOne,
      skillTwo,
      skillThree,
      experience,
    } = req.body;
    const error = validatorResult(req);
    if (!error) {
      res.status(400).json({
        error: error.array(),
      });
    }
    const portfolio = new Resume({
      Fullname,
      city,
      phone,
      email,
      age,
      subject,
      education,
      skillOne,
      skillTwo,
      skillThree,
      experience,
    });
    portfolioDB.push(
      Fullname,
      city,
      phone,
      email,
      age,
      subject,
      education,
      skillOne,
      skillTwo,
      skillThree,
      experience
    );
    console.log(portfolioDB);
    res.redirect("recruit/dashboard");
  }
);

router.get("/introduction", (req, res) => {
  res.render("/recruitment/intro");
});
module.exports = router;
