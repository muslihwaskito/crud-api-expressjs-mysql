const express = require('express');
const router = express.Router();
const userConteroller = require('../controllers/users');

router.post('/register', userConteroller.create);
router.post('/login', userConteroller.login);

module.exports = router;