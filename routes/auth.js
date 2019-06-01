const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/login', controller.auth.getLoginPage);
router.get('/reg', controller.auth.getRegPage);

module.exports = router;
