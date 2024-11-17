var express = require('express');
var router = express.Router();
var Users = require("./api/users")
var Notes = require("./api/notes")

router.use("/users", Users)
router.use("/notes", Notes)

module.exports = router;