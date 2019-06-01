function getMonthPage(req, res) {
  res.render('month.ejs', {
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

function getCategoryListPage(req, res) {
  res.render('category_list.ejs', {
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

module.exports = {
  getMonthPage,
  getDayPage,
  getInputPage,
  getCompareBudgetPage,
  getPercentPage,
  getCategoryListPage,
};
