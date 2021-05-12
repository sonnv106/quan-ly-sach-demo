const express = require("express");
var router = express.Router();
var controller = require("../controllers/user.controller");
router.get("/",controller.getIndex)
router.post("/", controller.postCreate);
module.exports = router;
