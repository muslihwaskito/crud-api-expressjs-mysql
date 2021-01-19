const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category");

router.post("/", categoryController.create);
router.get("/", categoryController.list);
router.get("/:id", categoryController.detail);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

module.exports = router;