// var moment = require('moment');

function reg () {
  let email = $('#email').val();
  let password = $('#pw').val();
  let name = $('#name').val();
  let phone = $('#phone').val();
  let coupang_id = $('#coupang_id').val();
  let coupang_pw = $('#coupang_pw').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: "/auth/reg",
      method: "POST",
      body: {
          email,
          password,
          name,
          phone,
          coupang_id,
          coupang_pw,
      },
      success: function (res) {
          spinner.stop();
          console.log('loginReq success');
          console.log(res);
          alert('성공적으로 회원가입되었습니다.');
          window.location.replace('/');
      },
      error: function (e) {
          spinner.stop();
          console.log(e.responseText);
          console.log('ajax call error: login page - loginReq');
          let jsonData = JSON.parse(e.responseText);
          alert(jsonData.message);
      }
  };
  sendReq(info);
}

$(document).ready(() => {
    $('#reg-btn').click(() => {
      reg();
    })
});
