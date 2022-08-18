const express = require("express");
const Teacher = require("../models/teacher");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const countOfTeachers = await Teacher.find({}).count();
        res.render("superAdmin/index", { countOfTeachers });

    } catch (error) {
        next(error);
    }
})

router.get("/pushUpdates", (req, res) => {
    res.render("superAdmin/pushUpdates");
})

router.post("/pushUpdates/create", async (req, res, next) => {
    const { districtName, update } = req.body;
})

router.get("/scheduleMettings", (req, res) => {
    res.render("superAdmin/scheduleMettings");
})

router.get("/teacherTransfer", (req, res) => {
    res.render("superAdmin/teacherTransfer");
})


module.exports = router;