function getLoginPage(req, res) {
  res.render('login.ejs', {
  });
}

function getRegPage(req, res) {
  res.render('reg.ejs', {
  });
}

module.exports = {
  getLoginPage,
  getRegPage,
};
