const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/login', controller.getAdminLoginPage);
router.get('/user/info', controller.getAdminMainPage);
router.get('/history', controller.getAdminPurchaseListPage);
router.get('/feedback', controller.getAdminFeedbackPage);
router.get('/crawler', controller.getAdminCrawlerPage);

module.exports = router;
