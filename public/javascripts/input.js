// var moment = require('moment');
const token = sessionStorage.getItem('token');

function input() {
  const name = $('#item-name').val();
  const price = $('#price').val();
  const date = $('#datepicker').val();

  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/history/new',
    method: 'POST',
    body: {
      name,
      price,
      date,
    },
    success(res) {
      spinner.stop();
      console.log('inputReq success');
      alert(`${getCategory(res.category)}의 ${res.item_name}가 등록되었습니다.`);
      $('#item-name').val('');
      $('#price').val('');
      $('#datepicker').val('');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: input page - inputReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

function logout() {
  sessionStorage.clear();
  alert('로그아웃 되었습니다');
  window.location.replace('/');
}

function feedback() {
  const content = $('#feedback-content').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/user/feedback',
    method: 'POST',
    body: {
      content,
    },
    success(res) {
      spinner.stop();
      console.log('feedbackReq success');
      alert(res.message);
      $('#feedback').modal('toggle');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: lobby page - feedbackReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

function withdrawl() {
  const password = $('#withdrawl-password').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/user/withdrawl',
    method: 'DELETE',
    body: {
      password,
    },
    success(res) {
      spinner.stop();
      console.log('withdrawlReq success');
      alert(res.message);
      $('#withdrawl').modal('toggle');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: lobby page - withdrawlReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

$(document).ready(() => {
  $('#item-input-btn').click(() => {
    input();
  });
  $('#logout').click(() => {
    logout();
  });
  $('#nav-month').click(() => {
    window.location.replace(`/lobby?month=${moment().format('M')}`);
  });
  $('#nav-day').click(() => {
    window.location.replace(`/day?month=${moment().format('M')}&day=${moment().format('D')}`);
  });
  $('#nav-input').click(() => {
    window.location.replace('/input');
  });
  $('#get-budget-btn').click(() => {
    window.location.replace('/budget');
  });
  $('#feedback-btn').click(() => {
    feedback();
  });
  $('#datepicker').datepicker({
    dateFormat: 'yy-mm-dd',
  });
  $('#withdrawl-btn').click(() => {
    withdrawl();
  });
});
