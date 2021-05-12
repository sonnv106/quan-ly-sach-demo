const express = require("express");
var router = express.Router();
var controller = require("../controllers/login.controller");
router.post("/", controller.postLogin);
module.exports = router;
