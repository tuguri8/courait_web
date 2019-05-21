const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/budget/new', controller.getChangeBudgetPage);
router.get('/budget', controller.getBudgetPage);
router.get('/category', controller.getCategoryPage);

module.exports = router;
