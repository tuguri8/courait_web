require('dotenv').config()

function getMainPage(req, res) {
	res.render('main.ejs', {
	});
}

function getLoginPage(req, res) {
	res.render('login.ejs', {
	});
}

function getRegPage(req, res) {
	res.render('reg.ejs', {
	});
}

function getLobbyPage(req, res) {
	res.render('lobby.ejs', {
	});
}

function getDayPage(req, res) {
	res.render('day.ejs', {
	});
}

function getInputPage(req, res) {
	res.render('input.ejs', {
	});
}

function getBudgetPage(req, res) {
	res.render('budget.ejs', {
	});
}

function getChangeBudgetPage(req, res) {
	res.render('change_budget.ejs', {
	});
}

function getCompareBudgetPage(req, res) {
	res.render('compare_budget.ejs', {
	});
}

function getPercentPage(req, res) {
	res.render('percent.ejs', {
	});
}

function getCategoryPage(req, res) {
	res.render('category.ejs', {
	});
}

function getCategoryListPage(req, res) {
	res.render('category_list.ejs', {
	});
}

module.exports = {
    getMainPage: getMainPage,
    getLoginPage: getLoginPage,
		getRegPage: getRegPage,
		getLobbyPage: getLobbyPage,
		getDayPage: getDayPage,
		getInputPage: getInputPage,
		getBudgetPage: getBudgetPage,
		getChangeBudgetPage: getChangeBudgetPage,
		getCompareBudgetPage: getCompareBudgetPage,
		getPercentPage: getPercentPage,
		getCategoryPage: getCategoryPage,
		getCategoryListPage: getCategoryListPage,
}