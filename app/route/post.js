const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

router.post("/", postController.create);
router.get("/", postController.list);
router.get("/:id", postController.detail);
router.put("/:id", postController.update);
router.delete("/:id", postController.delete);

module.exports = router;