const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get("/", userController.list);
router.get("/:id", userController.detail);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;