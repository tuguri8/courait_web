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
      for (let i = 0; i < res.user_list.length; i++) {
        $('.day-content').append(`<div id="day" class="card">
                <div class="card-body">
                  <div class="inner-body-left">
                    <span id="id" style="padding-top: 1%;">${res.user_list[i].email}</span>
                    <span id="name" style="padding-top: 1%;">${res.user_list[i].name}</span>
                    <span id="phone" style="padding-top: 1%;">${res.user_list[i].phone}</span>
                    <button id="add_admin" type="button" class="btn btn-warning btn-sm">관리자 추가</button>
                    <button id="delete_user" type="button" class="btn btn-warning btn-sm">계정 삭제</button>
                    <button id="purchase_list" type="button" class="btn btn-warning btn-sm">지출 내역 보기</button>
                    <button id="alarm" type="button" class="btn btn-warning btn-sm">구매알림 보기</button>
                  </div>
              </div></div>`);
      }
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: lobby page - AdminGetUserInfoReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

function logout() {
  sessionStorage.clear();
  alert('로그아웃 되었습니다');
  window.location.replace('/admin/login');
}

function addAdmin(email) {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/admin/new',
    method: 'POST',
    body: {
      email,
    },
    success(res) {
      spinner.stop();
      console.log('newAdminReq success');
      alert(res.message);
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: adminlobby page - newAdminReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

function deleteUser(email) {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/admin/user/info',
    method: 'DELETE',
    body: {
      email,
    },
    success(res) {
      spinner.stop();
      console.log('deleteUserReq success');
      alert(res.message);
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: adminlobby page - deleteUserReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

$(document).ready(() => {
  getUserInfo();
  // getPrev();
  $('body').on('click', '#add_admin', (e) => {
    const addAdminConfirm = confirm('관리자로 등록하시겠습니까?');
    if (addAdminConfirm) {
      addAdmin($(e.target).siblings('span#id').text());
    }
  });
  $('body').on('click', '#delete_user', (e) => {
    const addDeleteConfirm = confirm('사용자 계정을 삭제하시겠습니까?');
    if (addDeleteConfirm) {
      deleteUser($(e.target).siblings('span#id').text());
    }
  });
  $('body').on('click', '#purchase_list', (e) => {
    window.location.replace(`/admin/history?phone=${$(e.target).siblings('span#phone').text()}&name=${encodeURI($(e.target).siblings('span#name').text())}`);
  });
  $('body').on('click', '#alarm', (e) => {
    window.location.replace(`/admin/alarm?phone=${$(e.target).siblings('span#phone').text()}&name=${encodeURI($(e.target).siblings('span#name').text())}`);
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
  $('#logo').click(() => {
    window.location.replace('/admin/user/info');
  });
});
