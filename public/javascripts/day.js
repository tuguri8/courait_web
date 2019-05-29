// var moment = require('moment');
const token = sessionStorage.getItem('token');

function getDay() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: `/history/day?year=2019&month=${getUrlVars().month}&day=${getUrlVars().day}`,
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      $('#mp').html(`<span id="price">${res.day_price}</span><span id="won"></span>`);
      for (let i = 0; i < Object.keys(res.day_list).length; i++) {
        $('.day-content').append(`<div id="day" class="card">
              <div class="card-header">${getCategory(res.day_list[i].category)}</div>
              <div class="card-body">
              <div class="">
                <span>${res.day_list[i].item_name}</span>
              </div>
              <div class="">${res.day_list[i].price}원</div>
            </div></div>`);
      }
      $('#price').counterUp({
        delay: 10, // the delay time in ms
        time: 1000, // the speed time in ms
      });
      $('#won').append('원').delay(1000);
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: login page - loginReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
      // window.location.replace('/');
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

function excel() {
  const month = $('#excel-month').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: `/history/excel?year=2019&month=${month}`,
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      window.open(`${res.url}`);
      $('#excel').modal('toggle');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: lobby page - excelReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

$(document).ready(() => {
  getDay();
  // getPrev();
  $('#month-header').html(`고객님의 ${getUrlVars().month}월 ${getUrlVars().day}일 지출 금액 입니다`);
  $('#prev').click(() => {
    window.location.replace(`/history/day?month=${moment(getUrlVars().month, 'M').format('M')}&day=${moment(getUrlVars().day, 'D').subtract(1, 'days').format('D')}`);
  });
  $('#next').click(() => {
    if (getUrlVars().day === moment().format('D')) {
      alert('마지막 페이지 입니다!');
    } else {
      window.location.replace(`/history/day?month=${moment(getUrlVars().month, 'M').format('M')}&day=${moment(getUrlVars().day, 'D').add(1, 'days').format('D')}`);
    }
  });
  $('.card-calendar').hide();
  $('button.btn-calender').click(() => {
    $('.card-calendar').fadeIn(300);
  });
  $('#logout').click(() => {
    logout();
  });
  $('#nav-month').click(() => {
    window.location.replace(`/history/month?month=${moment().format('M')}`);
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
  $('#excel-btn').click(() => {
    excel();
  });
  $('#logo').click(() => {
    window.location.replace(`/history/month?month=${moment().format('M')}`);
  });
});
