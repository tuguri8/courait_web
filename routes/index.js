var express = require('express');
var router = express.Router();
const userController = require('../controllers/index');

/* GET home page. */
router.get('/', userController.getLoginPage);
router.get('/main', userController.getMainPage);
router.get('/reg', userController.getRegPage);
router.get('/lobby', userController.getLobbyPage);
router.get('/day', userController.getDayPage);
router.get('/input', userController.getInputPage);
router.get('/budget', userController.getBudgetPage);
router.get('/change_budget', userController.getChangeBudgetPage);
router.get('/compare_budget', userController.getCompareBudgetPage);
router.get('/percent', userController.getPercentPage);
router.get('/category', userController.getCategoryPage);
router.get('/list', userController.getCategoryListPage);

module.exports = router;
