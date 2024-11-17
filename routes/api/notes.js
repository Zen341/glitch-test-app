var express = require('express');
var router = express.Router();
var Notes = require("../../controllers/Notes")
const formData = require("express-form-data")
const { checkLogin } = require("../../controllers/Users")

router.post("/create", checkLogin, formData.parse(), Notes.create)

module.exports = router;
