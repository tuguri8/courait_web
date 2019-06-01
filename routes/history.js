const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/month', controller.history.getMonthPage);
router.get('/day', controller.history.getDayPage);
router.get('/category', controller.history.getCategoryListPage);
router.get('/percent', controller.history.getPercentPage);
router.get('/budget', controller.history.getCompareBudgetPage);
router.get('/new', controller.history.getInputPage);

module.exports = router;
