const express = require("express");
var router = express.Router();
var upload = require("../multer");
var controller = require("../controllers/book.controller");
router.get("/", controller.getIndex, controller.error);
router.post("/", upload.single("image"), controller.postIndex);
router.get("/:id/delete", controller.delete);
router.get("/:title/update", controller.getUpdate);
router.post("/:title/update", controller.postUpdate);

module.exports = router;
