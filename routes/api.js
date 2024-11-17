var express = require('express');
var router = express.Router();
var Users = require("./api/users")

router.use("/users", Users)

module.exports = router;