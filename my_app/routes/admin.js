require("dotenv").config();
const Admin = require("../models/admin");
const JWT = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const checkAdmin = require("../middlewares/checkAdmin");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const Email = require("../models/email");
router.get("/", (req, res) => {
    res.render("admin/index");
})

router.get("/login", (req, res) => {
    res.render("admin/login");
})

router.get("/resigter", (req, res) => {
    res.render("admin/register");
})

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    const admin = await Admin.find({ email });

    if (!admin) {
        return res.status(400).json({ error: "email or password is not correct" });
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
        return res.status(400).json({ error: "email or password is not correct" });
    }

    const token = JWT.sign({ email, msg: "I am admin level 1" }, process.env.AUTH_SECRET, {
        expiresIn: "2 days"
    })

    res
        .cookie("adminToken", token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
        .redirect(200, "/index")
})

router.post("/register", checkAdmin, [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password which is more than five characters").isLength({
        min: 6
    })
], async (req, res, next) => {
    const { username, password, email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const adminUser = await Admin.find({ email });

    if (adminUser) {
        return res.status(401).json({ error: "User is already registered as admin !" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdminUser = new Admin({ username, password: hashedPassword, email, isAdmin: 1 });
    await newAdminUser.save();

    const token = JWT.sign({ email, msg: "I am the admin level 1" }, process.env.AUTH_SECRET, {
        expiresIn: "2 days"
    })

    res.cookie("adminCookie", token, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000
    }).redirect(200, "/index");
})

router.get("/logout", checkAdmin, (req, res) => {
    const token = req.cookies("adminToken");
    res.clearCookie("adminCookie", { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
    res.redirect("/index");
})

router.get("/email", (req, res) => {
    res.render("admin/email");
})

router.post("/email/create", checkAdmin, [,
    check("subject", "Please include a subject in the email").isLength({
        min: 1
    }),
    check("message", "Please include a message in the email").isLength({
        min: 1
    })
], async (req, res, next) => {
    const { subject, message } = req.body;
    const error = validationResult(req);

    if (!error) {
        return res.status(400).json({
            error: error.array()
        })
    }

    const email = new Email({
        from: "Admin", subject, message
    })
    email.save();
    res.redirect("/index");
})

module.exports = router;