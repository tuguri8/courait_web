const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/login', controller.getLoginPage);
router.get('/reg', controller.getRegPage);

module.exports = router;
