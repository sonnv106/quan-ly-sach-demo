const express = require("express");
var router = express.Router();
var controller = require("../controllers/transaction.controller");

router.get("/", controller.index);
router.get("/create", controller.getCreate);
router.post("/create", controller.postCreate);
// router.get("/:id/complete", controller.getComplete);
// router.post("/:id/complete", controller.postComplete);
module.exports = router;
