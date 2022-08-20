const express = require("express");
const DailyUpdates = require("../models/admin/dailyUpdates");
const Teacher = require("../models/teacher");
const router = express.Router();
const cloudinary = require("../cloudinary/index");
const training = require("../trainingDB");
const pushUpdates = require("../pushUpdates");
const school = require("../schoolDB");
const transfer = require("../transferDB");
const districtDB = require("../districtDB");
const pushUpdatesDB = require("../pushUpdates");
const dailyUpdatesDB = require("../dailyUpdatesDB");
router.get("/", async (req, res, next) => {
    try {
        const countOfTeachers = await Teacher.find({}).count();
        const countOfSchools = school.length;
        res.render("superAdmin/index", { countOfTeachers, countOfSchools });

    } catch (error) {
        next(error);
    }
})

router.get("/pushUpdates", (req, res) => {
    res.render("superAdmin/pushUpdates", { pushUpdatesDB });
})

router.get("/pushUpdates/create", (req, res) => {
    res.render("superAdmin/sendUpdate", { district: districtDB });
})

router.post("/pushUpdates/create", async (req, res, next) => {
    const { message, district } = req.body;
    const schools = school.filter((school) => school.district === district);
    schools.push({ message });
    pushUpdatesDB.push(message);
    res.redirect("/superAdmin/pushUpdates");
})

router.delete("/pushUpdates/delete/:id", (req, res) => {
    const { id } = req.params;
    pushUpdatesDB.splice(id, 1);
    res.redirect("/superAdmin/pushUpdates");
})

router.delete("/pushUpdates/:id", (req, res) => {
    const { id } = req.params;
    pushUpdates.splice(id, 1);
    res.redirect("/superAdmin");
})

router.get("/scheduleMettings", (req, res) => {
    res.render("superAdmin/scheduleMettings", { training });
})

router.post("/scheduleMettings", async (req, res) => {
    const { title, timeFrom, timeTo, timeDuration, timeFormat, trainingDoc } = req.body;
    try {
        const fileURL = cloudinary.uploader.upload(trainingDoc);
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

router.get("/schools", (req, res) => {
    res.render("superAdmin/schools", { school });
})

router.get("/teacherTransfer", (req, res) => {
    res.render("superAdmin/teacherTransfer");
})

router.post("/teacherTransfer/:id", (req, res) => {
    const { id } = req.params;
    transfer.splice(id, 1);
    // Need to add extra logic for full filling transfer process
    res.redirect("/superAdmin/teacherTransfer");
})

router.delete("teacherTransfer/:id", (req, res) => {
    const { id } = req.params;
    transfer.splice(id, 1);
    // Need to add extra logic for full filling transfer process
    res.redirect("/superAdmin/teacherTransfer");
})

router.get("/assignAdmin", (req, res) => {
    res.render("/superAdmin/assignAdmin");
})


module.exports = router;