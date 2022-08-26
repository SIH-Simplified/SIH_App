require("dotenv").config();
const teacher = require("../models/teacher");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const Transfer = require("../models/teacher/transfer");
const transferDB = require("../transferDB");
const checkAdmin = require("../middlewares/checkAdmin");
const { check, validationResult, checkSchema } = require("express-validator");
const cloudinary = require("../cloudinary/index");
const leaveDB = require("../leaveDB");
const promotionDB = require("../promotion");
const Promotion = require("../models/teacher/promotion");
const teacherDB = require("../teacherDB");
const router = express.Router();

router.get("/", (req, res) => {
  let department = "Primary";
  let userName = "Kunal Kumar";
  let serviceSpan = "1.4 years";
  let salary = "75k";
  res.render("teacher/index", {
    department: department,
    userName: userName,
    serviceSpan: serviceSpan,
    salary: salary,
  });
});
router.get("/login", (req, res) => {
  res.render("teacher/login");
});
router.get("/register", (req, res) => {
  res.render("teacher/register");
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const Teacher = await teacher.find({ email });

    if (!Teacher) {
      return res
        .status(400)
        .json({ error: "Email or password is not correct" });
    }

    const isValid = await bcrypt.compare(password, Teacher.password);

    if (!isValid) {
      return res
        .status(400)
        .json({ error: "Email or password is not correct" });
    }
    const token = JWT.sign(
      { email, msg: "I am Admin Level 0" },
      process.env.AUTH_SECRET,
      {
        expiresIn: "2 days",
      }
    );
    res
      .cookie("teacher", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
      })
      .redirect(200, "/index");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/register",
  [
    check("username", "Please enter the username for the user").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password which is more than five characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    const { username, password, email } = req.body;
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await teacher.find({ email });
      console.log(user);
      if (user && user.length !== 0) {
        return res
          .status(401)
          .render("teacher/login", { error: "User is already registered !" });
      }

      const hashedPassword = await bcrpyt.hash(password, 12);

      const newUser = new teacher({
        name: username,
        password: hashedPassword,
        email,
        isAdmin: 0,
      });

      await newUser.save();

      const token = JWT.sign(
        { email, msg: "I am admin level 0" },
        process.env.AUTH_SECRET,
        {
          expiresIn: "2 days",
        }
      );

      res
        .cookie("teacherCookie", token, {
          httpOnly: true,
          maxAge: 2 * 24 * 60 * 60 * 1000,
        })
        .redirect("/teacher");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/logout", (req, res) => {
  const token = req.cookies("teacherToken");
  res.clearCookie("teacherCookie", {
    httpOnly: true,
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  res.redirect("/index");
});

router.get("/email", (req, res) => {
  res.render("teacher/email");
});
router.get("/email/email_content", (req, res) => {
  res.render("teacher/email_content");
});

router.post(
  "/email/create",
  checkAdmin,
  [
    check("subject", "Please include a subject in the email").isLength({
      min: 1,
    }),
    check("message", " Please include a message in the email").isLength({
      min: 1,
    }),
  ],
  async (req, res, next) => {
    const { subject, message } = req.body;
    const error = validationResult(req);

    if (!error) {
      return res.status(400).json({
        error: error.array(),
      });
    }

    const email = new Email({
      from: "teacher",
      subject,
      message,
    });
    email.save();
    res.redirect("/index");
  }
);

router.get("/transfer/guidelines", (req, res) => {
  res.render("teacher/transfer/transfer");
});

router.get("/transfer/form", (req, res) => {
  res.render("teacher/transfer/transfer-form");
});
router.post(
  "/transfer/form/send",
  [
    check("mobile_number", "Please enter a valid phone number")
      .isLength({ min: 10 })
      .isMobilePhone(),
    check("email", "Please enter a valid email").isEmail(),
  ],
  async (req, res, next) => {
    const {
      email,
      mobile_number,
      state,
      school_type,
      dob,
      present_school,
      subject,
      marital_status,
      date_of_joining,
      city,
      gender,
      present_district,
      current_designation,
    } = req.body;
    const error = validationResult(req);
    if (!error) {
      return res.status(400).json({
        error: error.array(),
      });
    }
    const transfer = new Transfer({
      email,
      mobile_number,
      state,
      school_type,
      dob,
      present_school,
      subject,
      marital_status,
      date_of_joining,
      city,
      gender,
      present_district,
      current_designation,
    });
    // transfer.save();
    transferDB.push({
      email,
      mobile_number,
      state,
      school_type,
      dob,
      present_school,
      subject,
      marital_status,
      date_of_joining,
      city,
      gender,
      present_district,
      current_designation,
    });
    res.redirect("/client/transfer/transfer-choices");
  }
);

router.get("/promotion", (req, res) => {
  res.render("teacher/promotion.ejs");
});

router.post(
  "/promotion/send",
  [
    check("name", "Please fill this field"),
    check("email", "Please enter a valid email").isEmail(),
  ],
  async (req, res, next) => {
    const { name, email, dept, current_designation } = req.body;
    const promotion = new Promotion({
      name,
      email,
      dept,
      current_designation,
    });
    promotionDB.push({
      name,
      email,
      dept,
      current_designation,
    });
    console.log(promotionDB);
    res.redirect("/client");
  }
);

router.get("/transfer/transfer-choices", (req, res) => {
  res.render("teacher/transfer/transfer-choices");
});
router.post("/transfer/transfer-choices/send", async (req, res, next) => {
  const { choice } = req.body;
  console.log(choice);
  res.redirect("/client/transfer/preference-choices");
});

router.get("/transfer/preference-choices", (req, res) => {
  res.render("teacher/transfer/transfer_preference_choices");
});

router.post("/transfer/preference-choices/send", async (req, res, next) => {
  res.redirect("/client/transfer/ack");
});

router.get("/transfer/ack", (req, res) => {
  res.render("teacher/transfer/transfer_ack");
});
router.get("/transfer/finished", (req, res) => {
  res.render("teacher/transfer/finished");
});

router.get("/study", (req, res) => {
  res.render("teacher/study/study");
});

router.get("/todo", (req, res) => {
  res.render("to_do");
});
router.get("/calendar", (req, res) => {
  res.render("teacher/calendar");
});
router.get("/view-portfolio", (req, res) => {
  res.render("portfolio");
});
router.get("/dailyUpdates", async (req, res, next) => {
  try {
    const updates = await DailyUpdates.find({});
    res.json({ updates });
  } catch (error) {
    next(error);
  }
});
router.post("/leaves", (req, res, next) => {
  const { leaveType, dayType, from, to, department, supervisor, reason } =
    req.body;
  leaveDB.push(leaveType, dayType, from, to, department, supervisor, reason);
  console.log(leaveDB);
  res.redirect("/client");
});

router.get("/trainings", (req, res) => {
  const userName = "Kunal Kumar";
  res.render("teacher/trainings", {
    userName: userName,
  });
});

module.exports = router;
