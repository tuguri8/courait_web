const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/login', controller.admin.getAdminLoginPage);
router.get('/user/info', controller.admin.getAdminMainPage);
router.get('/history', controller.admin.getAdminPurchaseListPage);
router.get('/feedback', controller.admin.getAdminFeedbackPage);
router.get('/crawler', controller.admin.getAdminCrawlerPage);
router.get('/alarm', controller.admin.getAdminAlarmPage);

module.exports = router;
