const token = sessionStorage.getItem('token');

function applyCSS() {
  switch (getUrlVars().category) {
    case 'fashion':
      $('body').css({ background: 'linear-gradient(to bottom, #a8ccf7 40%, #fdfdfd 40%)' });
      $('.content').css('background-color', '#a8ccf7');
      $('.wrap').css('background-color', '#a8ccf7');
      $('.card-title').css('color', '#245382');
      break;
    case 'cosmetic':
      $('body').css({ background: 'linear-gradient(to bottom, #e28b99 40%, #fdfdfd 40%)' });
      $('.content').css('background-color', '#e28b99');
      $('.wrap').css('background-color', '#e28b99');
      $('.card-title').css('color', '633E44');
      break;
    case 'digital':
      $('body').css({ background: 'linear-gradient(to bottom, #cdb297 40%, #fdfdfd 40%)' });
      $('.content').css('background-color', '#cdb297');
      $('.wrap').css('background-color', '#cdb297');
      $('.card-title').css('color', '#7b6b5a');
      break;
    case 'interior':
      $('body').css({ background: 'linear-gradient(to bottom, #1a323d 40%, #fdfdfd 40%)' });
      $('.content').css('background-color', '#1a323d');
      $('.wrap').css('background-color', '#1a323d');
      $('.card-title').css('color', '#cab788');
      break;
    case 'kid':
      $('body').css({ background: 'linear-gradient(to bottom, #9c7bbe 40%, #fdfdfd 40%)' });
      $('.content').css('background-color', '#9c7bbe');
      $('.wrap').css('background-color', '#9c7bbe');
      $('.card-title').css('color', '#2B1640');
      break;
    case 'food':
      $('body').css({ background: 'linear-gradient(to bottom, #a4c09d 40%, #fdfdfd 40%)' });
      $('.content').css('background-color', '#a4c09d');
      $('.wrap').css('background-color', '#a4c09d');
      $('.card-title').css('color', '#6a7d66');
      break;
    case 'sports':
      $('body').css({ background: 'linear-gradient(to bottom, #e49535 40%, #fdfdfd 40%)' });
      $('.content').css('background-color', '#e49535');
      $('.wrap').css('background-color', '#e49535');
      $('.card-title').css('color', '#634117');
      break;
    case 'life':
      $('body').css({ background: 'linear-gradient(to bottom, #5a6fc5 40%, #fdfdfd 40%)' });
      $('.content').css('background-color', '#5a6fc5');
      $('.wrap').css('background-color', '#5a6fc5');
      $('.card-title').css('color', '#344176');
      break;
    case 'culture':
      $('body').css({ background: 'linear-gradient(to bottom, #F2DD85 40%, #fdfdfd 40%)' });
      $('.content').css('background-color', '#F2DD85');
      $('.wrap').css('background-color', '#F2DD85');
      $('.card-title').css('color', '#736F62');
      break;
    default:
      break;
  }
}

function category() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: `/history/category?category=${getUrlVars().category}`,
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      $('.day-title').append(`<span>${getCategory(res.category)} 지출 내역</span>`);
      $('.day-subtitle').append(`<span>${getCategory(res.category)} 카테고리의 지출 내역을 확인할 수 있습니다</span>`);
      if (Object.keys(res.category_list).length < 3) {
        $('.percent-card').css('justify-content', 'center');
        $('.percent-card').css('padding-left', '0');
      }
      for (let i = 0; i < Object.keys(res.category_list).length; i++) {
        const key = Object.keys(res.category_list)[i];
        $('.percent-card').append(`<div id="${key}" class="card swiper-slide" style="background-color: #fcfcfc">
            <span class="card-title">${moment(key).format('M')}월 ${moment(key).format('D')}일</span>
            </div>`);
        for (let j = 0; j < res.category_list[key].length; j++) {
          $(`#${key}`).append(`<div class="card-list">
                <span class="card-content">${res.category_list[key][j].item_name}</span>
                <span class="card-content">${res.category_list[key][j].price}원</span>
                </div>`);
        }
      }
      const mySwiper = new Swiper('.swiper-container', {
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
      applyCSS();
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: login page - loginReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
      window.location.replace('/category');
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
  category();
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
