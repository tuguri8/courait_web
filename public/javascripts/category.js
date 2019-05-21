// var moment = require('moment');
const token = sessionStorage.getItem('token');

function percent() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/history/percent',
    method: 'GET',
    success(res) {
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

$(document).ready(() => {
  percent();
  const mySwiper = new Swiper('.swiper-container', {
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
  $('.card').on('click', function (e) {
    window.location.replace(`/history/category?category=${$(this).attr('id')}`);
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
