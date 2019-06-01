// var moment = require('moment');

function reg() {
  const email = $('#email').val();
  const password = $('#pw').val();
  const name = $('#name').val();
  const phone = $('#phone').val();
  const coupang_id = $('#coupang_id').val();
  const coupang_pw = $('#coupang_pw').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/auth/reg',
    method: 'POST',
    body: {
      email,
      password,
      name,
      phone,
      coupang_id,
      coupang_pw,
    },
    success(res) {
      spinner.stop();
      console.log('loginReq success');
      console.log(res);
      alert('성공적으로 회원가입되었습니다.');
      window.location.replace('/auth/login');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: login page - loginReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendReq(info);
}

$(document).ready(() => {
  $('#reg-btn').click(() => {
    if ($('#pw').val() === $('#pw2').val()) {
      reg();
    } else {
      alert('비밀번호를 확인해주세요!');
    }
  });
  $('#logo').click(() => {
    window.location.replace('/auth/login');
  });
  $('#app').click(() => {
    window.open('https://courait.s3.ap-northeast-2.amazonaws.com/courait.apk', '_blank');
  });
  $('#admin').click(() => {
    window.location.replace('/admin/login');
  });
});
