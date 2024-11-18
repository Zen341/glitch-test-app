var express = require('express');
var router = express.Router();
const { checkLogin } = require("../controllers/Users")
const { getUserNotes, getNote } = require("../controllers/Notes")

/* GET home page. */
router.get('/', checkLogin, function (req, res, next) {
  if (req?.user) {
    res.redirect("/notes")
  }
  res.render('index', { title: 'Note App', time: (new Date()).toLocaleString(), user: req?.user });
});

router.get("/notes", checkLogin, async (req, res, next) => {
  if (!req?.user) {
    res.redirect("/")
  }
  const notes = await getUserNotes(req?.user?.id)
  let note = null
  const noteid = req.query.id
  if (noteid) {
    note = await getNote(noteid, req?.user?.id)
  }
  res.render("notes", { user: req?.user, notes: notes, note: note })
})

router.get("/notes/create", checkLogin, async (req, res, next) => {
  if (!req?.user) {
    res.redirect("/")
  }
  const notes = await getUserNotes(req?.user?.id)
  res.render("create-note", { user: req?.user, notes: notes })
})

module.exports = router;
