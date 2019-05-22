// var moment = require('moment');
const token = sessionStorage.getItem('token');

function getUserInfo() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: `/admin/user/info`,
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      const eventJson = [];
      $('.day-content').append(`<div id="day" class="card">
              <div class="card-body">
              <div>아이디</div>
              <div>이름</div>
              <div>전화번호</div>
            </div></div>`);
      for (let i = 0; i < res.user_list.length; i++) {
        $('.day-content').append(`<div id="day" class="card">
                <div class="card-body">
                <div>${res.user_list[i].email}</div>
                <div>${res.user_list[i].name}</div>
                <div>${res.user_list[i].phone}</div>
                <button type="button" class="btn btn-warning">관리자 추가</button>
                <button type="button" class="btn btn-warning">사용자 계정 삭제</button>
              </div></div>`);
      }
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
  window.location.replace('/admin/login');
}

$(document).ready(() => {
  getUserInfo();
  // getPrev();
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
