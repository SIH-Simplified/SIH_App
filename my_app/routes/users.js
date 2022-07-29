var express = require('express');
var router = express.Router();
const cloudinary = require("../cloudinary/index");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get("/resume-1", async (req, res, next) => {
  try {
    await cloudinary.uploader.upload("f:/SIH/SIH_App/my_app/public/simplifiedsihfinal20220422114630.pdf",
      { public_id: Math.random() * 10 * 201 }, function (error, result) {
        if (error) {
          next(error);
        }
        console.log(result);
      })
    console.log(cloudinary.config());
    res.render("resume-1");
  } catch (error) {
    next(error);
  }
})

router.get("/resume-2", (req, res) => {
  res.render("resume-2");
})

router.get("/resume-3", (req, res) => {
  res.render("resume-3");
})

module.exports = router;
