// var moment = require('moment');
let token = sessionStorage.getItem('token');

function getDay () {
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: `/history/day?year=2019&month=${getUrlVars()["month"]}&day=${getUrlVars()["day"]}`,
      method: "GET",
      success: function (res) {
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
          time: 1000 // the speed time in ms
          });
          $('#won').append('원').delay(1000);
      },
      error: function (e) {
          spinner.stop();
          console.log(e.responseText);
          console.log('ajax call error: login page - loginReq');
          let jsonData = JSON.parse(e.responseText);
          alert(jsonData.message);
          // window.location.replace('/');
      }
  };
  sendTokenReq(info, token);
}

function logout() {
  sessionStorage.clear();
  alert('로그아웃 되었습니다');
  window.location.replace('/');
}

function feedback() {
  let content = $('#feedback-content').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: "/user/feedback",
      method: "POST",
      body: {
          content,
      },
      success: function (res) {
          spinner.stop();
          console.log('feedbackReq success');
          alert(res.message);
          $('#feedback').modal('toggle');
      },
      error: function (e) {
          spinner.stop();
          console.log(e.responseText);
          console.log('ajax call error: lobby page - feedbackReq');
          let jsonData = JSON.parse(e.responseText);
          alert(jsonData.message);
      }
  };
  sendTokenReq(info, token);
}

function withdrawl() {
  let password = $('#withdrawl-password').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: "/user/withdrawl",
      method: "DELETE",
      body: {
          password,
      },
      success: function (res) {
          spinner.stop();
          console.log('withdrawlReq success');
          alert(res.message);
          $('#withdrawl').modal('toggle');
      },
      error: function (e) {
          spinner.stop();
          console.log(e.responseText);
          console.log('ajax call error: lobby page - withdrawlReq');
          let jsonData = JSON.parse(e.responseText);
          alert(jsonData.message);
      }
  };
  sendTokenReq(info, token);
}

$(document).ready(() => {
  getDay();
  // getPrev();
  $('#month-header').html(`고객님의 ${getUrlVars()["month"]}월 ${getUrlVars()["day"]}일 지출 금액 입니다`);
  $('#prev').click(() => {
    window.location.replace(`/day?month=${moment(getUrlVars()["month"], 'M').format('M')}&day=${moment(getUrlVars()["day"], 'D').subtract(1, 'days').format('D')}`);
  })
  $('#next').click(() => {
    if(getUrlVars()["day"] === moment().format('D')) {
      alert('마지막 페이지 입니다!');
    } else {
      window.location.replace(`/day?month=${moment(getUrlVars()["month"], 'M').format('M')}&day=${moment(getUrlVars()["day"], 'D').add(1, 'days').format('D')}`);
    }
  })
  $('.card-calendar').hide();
  $('button.btn-calender').click(() => {
    $('.card-calendar').fadeIn(300);
  });
  $('#logout').click(() => {
    logout();
  })
  $('#nav-month').click(() => {
    window.location.replace(`/lobby?month=${moment().format('M')}`);
  })
  $('#nav-input').click(() => {
    window.location.replace('/input');
  });
  $('#get-budget-btn').click(() => {
    window.location.replace('/budget');
  });
  $('#feedback-btn').click(() => {
    feedback();
  });
  $('#withdrawl-btn').click(() => {
    withdrawl();
  });
});