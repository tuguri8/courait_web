const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/budget/new', controller.user.getChangeBudgetPage);
router.get('/budget', controller.user.getBudgetPage);
router.get('/category', controller.user.getCategoryPage);
router.get('/guide', controller.user.getGuidePage);

module.exports = router;
