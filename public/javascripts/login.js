// var moment = require('moment');

function login () {
  let email = $('#email').val();
  let password = $('#pw').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: "/auth/login",
      method: "POST",
      body: {
          email: email,
          password: password
      },
      success: function (res) {
          spinner.stop();
          console.log('loginReq success');
          sessionStorage.setItem('token', res.token);
          alert('성공적으로 로그인되었습니다.');
          window.location.replace(`/lobby?month=${moment().format('M')}`);
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

function search_id () {
  let name = $('#searchid-name').val();
  let phone = $('#searchid-phone').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: "/auth/search/id",
      method: "POST",
      body: {
          name,
          phone,
      },
      success: function (res) {
          spinner.stop();
          console.log('searchIDReq success');
          console.log(res);
          alert(res.message);
          window.location.replace('/');
      },
      error: function (e) {
          spinner.stop();
          console.log(e.responseText);
          console.log('ajax call error: login page - serachid');
          let jsonData = JSON.parse(e.responseText);
          alert(jsonData.message);
      }
  };
  sendReq(info);
}

function search_pw () {
  let email = $('#searchpw-id').val();
  let name = $('#searchpw-name').val();
  let phone = $('#searchpw-phone').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: "/auth/search/pw",
      method: "POST",
      body: {
          email,
          name,
          phone,
      },
      success: function (res) {
          spinner.stop();
          console.log('searchPWReq success');
          console.log(res);
          alert(res.message);
          window.location.replace('/');
      },
      error: function (e) {
          spinner.stop();
          console.log(e.responseText);
          console.log('ajax call error: login page - serachPW');
          let jsonData = JSON.parse(e.responseText);
          alert(jsonData.message);
      }
  };
  sendReq(info);
}

$(document).ready(() => {
    $('#login-btn').click(() => {
      login();
      // var now = moment().format('YYYY-MM-DD');
        // alert(process.env.DB_USER);
    });

    $("#pw").keyup((e) => {
      if(e.keyCode == 13) {
          login();
      }
    });

    $('#modal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })

    $('#reg').click(() => {
      window.location.replace('/reg');
    })

    $('#id-btn').click(() => {
      search_id();
    })

    $('#pw-btn').click(() => {
      search_pw();
    })
});
