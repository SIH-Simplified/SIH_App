const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("superAdmin/index");
})

router.get("/pushUpdates", (req, res) => {
    res.render("superAdmin/pushUpdates");
})

module.exports = router;