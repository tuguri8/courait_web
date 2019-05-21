const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/month', controller.getLobbyPage);
router.get('/day', controller.getDayPage);
router.get('/category', controller.getCategoryListPage);
router.get('/percent', controller.getPercentPage);
router.get('/budget', controller.getCompareBudgetPage);
router.get('/new', controller.getInputPage);

module.exports = router;
