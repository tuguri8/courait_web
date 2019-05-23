// var moment = require('moment');

function login() {
  const email = $('#email').val();
  const password = $('#pw').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/admin/login',
    method: 'POST',
    body: {
      email,
      password,
    },
    success(res) {
      spinner.stop();
      console.log('loginReq success');
      sessionStorage.setItem('token', res.token);
      alert('성공적으로 로그인되었습니다.');
      window.location.replace(`/admin/user/info`);
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: login page - loginReq');
      // const jsonData = JSON.parse(e.responseText);
      alert('입력하신 정보가 잘못되었습니다!');
    },
  };
  sendReq(info);
}

function search_id() {
  const name = $('#searchid-name').val();
  const phone = $('#searchid-phone').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/auth/search/id',
    method: 'POST',
    body: {
      name,
      phone,
    },
    success(res) {
      spinner.stop();
      console.log('searchIDReq success');
      console.log(res);
      alert(res.message);
      window.location.replace('/auth/login');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: login page - serachid');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendReq(info);
}

function search_pw() {
  const email = $('#searchpw-id').val();
  const name = $('#searchpw-name').val();
  const phone = $('#searchpw-phone').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/auth/search/pw',
    method: 'POST',
    body: {
      email,
      name,
      phone,
    },
    success(res) {
      spinner.stop();
      console.log('searchPWReq success');
      console.log(res);
      alert(res.message);
      window.location.replace('/auth/login');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: login page - serachPW');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendReq(info);
}

$(document).ready(() => {
  $('#login-btn').click(() => {
    login();
    // var now = moment().format('YYYY-MM-DD');
    // alert(process.env.DB_USER);
  });

  $('#pw').keyup((e) => {
    if (e.keyCode == 13) {
      login();
    }
  });

  $('#modal').on('shown.bs.modal', () => {
    $('#myInput').trigger('focus');
  });

  $('#reg').click(() => {
    window.location.replace('/auth/reg');
  });

  $('#id-btn').click(() => {
    search_id();
  });

  $('#pw-btn').click(() => {
    search_pw();
  });
});
