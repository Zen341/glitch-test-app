var express = require('express');
var router = express.Router();
const { checkLogin } = require("../controllers/Users")

/* GET home page. */
router.get('/', checkLogin, function (req, res, next) {
  if (req?.user) {
    res.redirect("/notes")
  }
  res.render('index', { title: 'Note App', time: (new Date()).toLocaleString(), user: req?.user });
});

router.get("/notes", checkLogin, (req, res, next) => {
  if (!req?.user) {
    res.redirect("/")
  }
  res.render("notes", {user: req?.user})
})

module.exports = router;
