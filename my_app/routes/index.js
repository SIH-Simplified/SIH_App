require("dotenv").config();
const Teacher = require("../models/teacher");
const process = require("process");
const express = require('express');
const router = express.Router();
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const checkAuthMiddleWare = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (cookies === null || cookies === undefined || Object.keys(cookies).length === 0)
      res.redirect("/login");
    console.log("cookies = ", cookies);
  } catch (error) {
    next(error);
  }
  next();
}

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", async (req, res, next) => {
  const { userEmailLogin, passwordLogin } = req.body;

  try {
    const user = await Teacher.findOne({ email: userEmailLogin });

    if (!user) {
      return res.status("login", 400, { error: "Email or password is wrong" });
    }

    const isValid = await bcrypt.compare(passwordLogin, user.password);

    if (!isValid) {
      return res.redirect("login", 400, { error: "Email or password is wrong" });
    }

    const userJWT = JWT.sign({ emailRegister, msg: "I am logged in" }, process.env.SECRET, {
      expiresIn: "2d",
      subject: user.id
    });

    res.cookie("token", userJWT, { maxAge: 2 * 24 * 60 * 60, httpOnly: true });

    res.render("index");
  } catch (error) {
    next(error);
  }
})

router.post("/register", async (req, res, next) => {
  try {
    const { usernameRegister, emailRegister, passwordRegister, cpasswordRegister } = req.body;

    const preUser = await Teacher.findOne({ email: emailRegister });
    if (preUser) {
      console.log("User is already registered");
      return res.redirect("login", 403, {
        error: `User is already registered with this email id try logging in or register with a
           differenet email id`
      });
    }

    if (passwordRegister !== cpasswordRegister) {
      return res.redirect("/login", { error: "C_Password and password do not match" });
    }

    const hashedPassword = await bcrypt.hash(passwordRegister, 12);
    const user = new Teacher({ name: usernameRegister, email: emailRegister, password: hashedPassword });
    await user.save();
    // Store the user in the database

    const userJWT = JWT.sign({ emailRegister, msg: "I am logged in" }, process.env.SECRET, {
      expiresIn: "2d",
      subject: user.id
    });

    res.cookie("token", userJWT, { maxAge: 2 * 24 * 60 * 60, httpOnly: true, });
    res.send(userJWT);
  } catch (error) {
    next(error);
  }
})

router.post("/logout", (req, res, next) => {
  try {
    const { token } = req.cookies;

    res.clearCookie("token", { maxAge: 2 * 24 * 60 * 60, httpOnly: true });

    res.redirect("login", 200, { status: "User logged out" });

  } catch (error) {
    next(error);
  }
})
module.exports = router;
