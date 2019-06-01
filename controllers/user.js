function getBudgetPage(req, res) {
  res.render('budget.ejs', {
  });
}

function getChangeBudgetPage(req, res) {
  res.render('change_budget.ejs', {
  });
}

function getCategoryPage(req, res) {
  res.render('category.ejs', {
  });
}

function getGuidePage(req, res) {
  res.render('guide.ejs', {
  });
}

module.exports = {
  getBudgetPage,
  getChangeBudgetPage,
  getCategoryPage,
  getGuidePage,
};
