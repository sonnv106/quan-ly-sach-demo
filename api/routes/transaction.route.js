const express = require("express");
var router = express.Router();
var controller = require("../controllers/transaction.controller");
router.get("/", controller.getTransaction);
router.post("/",controller.postTransaction)
module.exports = router;
