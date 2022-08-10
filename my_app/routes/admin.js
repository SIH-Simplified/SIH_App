require("dotenv").config();
const Admin = require("../models/admin");
const JWT = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const checkAdmin = require("../middlewares/checkAdmin");
const bcrypt = require("bcryptjs");
const { check, validationResult, checkSchema } = require("express-validator");
const Email = require("../models/email");
const Teacher = require("../models/teacher");
const cloudinary = require("../cloudinary/index");
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
    try {
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
    } catch (error) {
        next(error);
    }

})

router.post("/register", [
    check("username", "Please enter username for the user").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password which is more than five characters").isLength({
        min: 6
    })
], async (req, res, next) => {
    const { username, password, email } = req.body;
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const adminUser = await Admin.find({ email });
        console.log(adminUser);
        if (adminUser && adminUser.length !== 0) {
            return res.status(401).json({ error: "User is already registered as admin !" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newAdminUser = new Admin({ adminName: username, password: hashedPassword, email, isAdmin: 1 });
        await newAdminUser.save();

        const token = JWT.sign({ email, msg: "I am the admin level 1" }, process.env.AUTH_SECRET, {
            expiresIn: "2 days"
        })

        res.cookie("adminCookie", token, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000
        }).redirect("/admin");
    } catch (error) {
        next(error);
    }

})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const admin = await Admin.find({ _id: id });
    if (!admin) { return res.status(400).redirect("/", { error: "Admin does not exist or is not registered" }); }
    res.json(admin);
})

router.get("/logout", checkAdmin, (req, res) => {
    const token = req.cookies("adminToken");
    res.clearCookie("adminCookie", { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
    res.redirect("/index");
})

router.get("/email", (req, res) => {
    res.render("admin/email");
})

router.post("/email/create", checkAdmin, [
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

router.get("/teachers", checkAdmin, async (req, res, next) => {
    try {
        const teachers = await Teacher.find({});
        res.json(teachers);
    } catch (error) {
        next(error);
    }
})

router.get("/teachers/create", checkAdmin, (req, res) => {
    res.render("/admin/create");
})

router.post("/teachers/create", checkAdmin, [
    check("teacher_id", "Please enter teacher_id").isLength({
        min: 1
    }),
    check("email", "Please enter a valid email address").isEmail(),
    check("username", "Please enter a valid username").notEmpty(),
    check("password", "Please enter a valid password").notEmpty()
], async (req, res, next) => {
    try {
        const { teacher_id, email, username, password } = req.body;
        const teacher = new Teacher({
            teacher_id, email, name: username, password
        })
        await teacher.save();

        res.redirect("/index", { success: "Teacher was successfully registerd" });

    } catch (error) {
        next(error);
    }
})

router.delete("/teachers/delete", checkAdmin, [
    check("teacher_id", "Please enter a valid teacher_id").isLength({
        min: 1
    })
], async (req, res, next) => {
    const { teacher_id } = req.body;
    try {
        const teacher = await Teacher.find({ teacher_id });
        if (!teacher) {
            return res.status(400).redirect("/index", { error: "Teacher is not registered" });
        }

        await Teacher.deleteOne({ teacher_id });

        res.redirect("/index", { success: "Teacher is successfully removed" })
    } catch (error) {
        next(error);
    }
})

router.get("/teachers/edit/:id", checkAdmin, async (req, res, next) => {
    const { id } = req.params;

    const teacher = await Teacher.find({ teacher_id: id });

    if (!teacher) {
        return res.status(400).redirect("/index", { error: "Teacher of entered does not exist" });
    }

    res.json(teacher);
})

// router.patch("/teachers/edit/:id", async (req, res, next) => {
//     const { id } = req.params;
//     try {
//     } catch (error) {

//     }
// })

router.get("/study", checkAdmin, (req, res) => {
    res.render("/admin/study");
})

router.post("/study/create", checkAdmin, async (req, res, next) => {
    const { studyMaterial } = req.body;
    try {
        const url = await cloudinary.uploader.upload(studyMaterial, {
            public_id: Math.random() * 54 * 456
        }, function (error) {
            next(error);
        })

        // Save this url in the database for future reference
        res.redirect("/index");
    } catch (error) {
        next(error);
    }
})

router.delete("/study/delete/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) { return res.status(400).redirect("/index", { error: "Please specify file to be deleted" }); }

        await cloudinary.uploader.destroy(id, function (error, result) {
            if (error) {
                next(error);
            }
            console.log(`File deleted ${result}`);
            res.redirect("/study");
        })

    } catch (error) {
        next(error);
    }
})

router.get("/study/read", (req, res) => {
    // Fetch all files of study material and send to the template
})

module.exports = router;