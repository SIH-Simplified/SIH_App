const express = require("express");
const Teacher = require("../models/teacher");
const router = express.Router();
const cloudinary = require("../cloudinary/index");
const training = require("../trainingDB");
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
})

router.get("/scheduleMettings", (req, res) => {
    res.render("superAdmin/scheduleMettings");
})

router.post("/scheduleMettings", (req, res) => {
    const { title, timeFrom, timeTo, timeDuration, timeFormat, trainingDoc } = req.body;
    try {
        const fileURL = await cloudinary.uploader.upload(trainingDoc);
        training.push({
            title,
            dateFrom,
            dateTo,
            location,
            training_pdf
        })
        res.redirect("/superAdmin/scheduleMettings");
    } catch (error) {
        next(error);
    }
})

router.delete("/scheduleMettings/:id", (req, res) => {
    const { id } = req.params;
    training.splice(id, 1);
    res.redirect("/superAdmin/scheduleMetttings");
})

router.get("/teacherTransfer", (req, res) => {
    res.render("superAdmin/teacherTransfer");
})


module.exports = router;