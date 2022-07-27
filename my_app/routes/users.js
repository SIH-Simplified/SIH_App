var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get("/resume-1", (req, res) => {
  res.render("resume-1");
})

router.get("/resume-2", (req, res) => {
  res.render("resume-2");
})

router.get("/resume-3", (req, res) => {
  res.render("resume-3");
})

module.exports = router;
