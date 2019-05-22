const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/login', controller.getAdminLoginPage);
router.get('/user/info', controller.getAdminMainPage);

module.exports = router;
