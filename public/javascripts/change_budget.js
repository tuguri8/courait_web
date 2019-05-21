// var moment = require('moment');
const token = sessionStorage.getItem('token');

function changeBudget() {
  const budget = $('#budget').val();

  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/user/budget',
    method: 'PUT',
    body: {
      budget,
    },
    success(res) {
      spinner.stop();
      console.log('change-budget success');
      alert('에산이 설정되었습니다.');
      $('#budget').val('');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: change-budget page - change-budgetㄱReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

function logout() {
  sessionStorage.clear();
  alert('로그아웃 되었습니다');
  window.location.replace('/auth/login');
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
  $('#change-budget-btn').click(() => {
    changeBudget();
  });
  $('#logout').click(() => {
    logout();
  });
  $('#nav-month').click(() => {
    window.location.replace(`/history/month?month=${moment().format('M')}`);
  });
  $('#nav-day').click(() => {
    window.location.replace(`/history/day?month=${moment().format('M')}&day=${moment().format('D')}`);
  });
  $('#nav-input').click(() => {
    window.location.replace('/history/new');
  });
  $('#get-budget-btn').click(() => {
    window.location.replace('/user/budget');
  });
  $('#feedback-btn').click(() => {
    feedback();
  });
  $('#withdrawl-btn').click(() => {
    withdrawl();
  });
});
