function getAdminLoginPage(req, res) {
  res.render('admin_login.ejs', {
  });
}

function getAdminMainPage(req, res) {
  res.render('admin_lobby.ejs', {
  });
}

function getAdminPurchaseListPage(req, res) {
  res.render('admin_purchase_list.ejs', {
  });
}

function getAdminFeedbackPage(req, res) {
  res.render('admin_feedback.ejs', {
  });
}

function getAdminCrawlerPage(req, res) {
  res.render('admin_crawler.ejs', {
  });
}

function getAdminAlarmPage(req, res) {
  res.render('admin_alarm.ejs', {
  });
}

module.exports = {
  getAdminLoginPage,
  getAdminMainPage,
  getAdminPurchaseListPage,
  getAdminFeedbackPage,
  getAdminCrawlerPage,
  getAdminAlarmPage,
};
