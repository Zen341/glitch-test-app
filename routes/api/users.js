var express = require('express');
var router = express.Router();
var Users = require("../../controllers/Users")
const formData = require("express-form-data")

// router.get("/init", Users.init)
router.post("/login", formData.parse(), Users.login)

module.exports = router;
