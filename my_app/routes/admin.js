require("dotenv").config();
const Admin = require("../models/admin");
const JWT = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const checkAdmin = require("../middlewares/checkAdmin");

router.get("/login", (req, res) => {
    res.render("admin");
})

router.post("/register", checkAdmin, (req, res) => {
    const { username, password } = req.body;
})

module.exports = router;