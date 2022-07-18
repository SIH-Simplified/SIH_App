var express = require('express');
var router = express.Router();

/* GET home page. */
router.all("/", (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (cookies === null || cookies === undefined || Object.keys(cookies).length === 0)
      res.redirect("/login");
    console.log("cookies = ", cookies);
  } catch (error) {
    next(error);
  }
  next();
})

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login", (req, res) => {
  res.render("login");
})
module.exports = router;
