// var moment = require('moment');
let token = sessionStorage.getItem('token');

function percent () {
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: '/history/percent',
      method: "GET",
      success: function (res) {
          spinner.stop();
          console.log(res);
          $('#fashion-price').append(`${res.fashion.price}원`);
          $('#cosmetic-price').append(`${res.cosmetic.price}원`);
          $('#digital-price').append(`${res.digital.price}원`);
          $('#interior-price').append(`${res.interior.price}원`);
          $('#kid-price').append(`${res.kid.price}원`);
          $('#food-price').append(`${res.food.price}원`);
          $('#sports-price').append(`${res.sports.price}원`);
          $('#life-price').append(`${res.life.price}원`);
          $('#culture-price').append(`${res.culture.price}원`);
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
  percent();
  var mySwiper = new Swiper ('.swiper-container', {
      // Optional parameters
      // loop: true,
      // loopedSlides: 3,
      // loopFillGroupWithBlank: false,
      slidesPerView: 'auto',
      grabCursor: true,
      slidesOffsetAfter: 250,
      // watchOverflow: true,
      speed: 600,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });
  $('.card').on('click', function(e){
    window.location.replace(`/list?category=${$(this).attr('id')}`);
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
  $('#withdrawl-btn').click(() => {
    withdrawl();
  });
});
