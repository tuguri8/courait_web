// var moment = require('moment');
const token = sessionStorage.getItem('token');

function getAlarm() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: `/admin/alarm?phone=${getUrlVars().phone}`,
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      $('.day-title').append(`<span>${decodeURI(getUrlVars().name)}님의 구매알림 날짜</span>`);
      $('.day-content').append(`<div id="day" class="card">
            <div class="card-header">
              <span>카테고리</span>
              <span>알림날짜</span>
            </div>
            <div class="card-body">
            </div>
          </div>`);
      for (let i = 0; i < res.alarm_list.length; i++) {
        let { date } = res.alarm_list[i];
        if (date === null) date = '-';
        $('.card-body').append(`
          <div class="alarm-content">
            <span>${getFoodCategory(res.alarm_list[i].food_category)}</span>
            <span>${date}</span>
          </div>`);
      }
      // <div class="">
      //   <span>${res.purchase_list[i].item_name}</span>
      // </div>
      // <div class="">${res.purchase_list[i].price}원</div>
      // ${getFoodCategory(res.alarm_list[i].food_category)}
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: alarm page - AdminGetAlarmReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
      window.location.replace('/admin/user/info');
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
  getAlarm();
  $('#logout').click(() => {
    logout();
  });
  $('#logo').click(() => {
    window.location.replace('/admin/user/info');
  });
});
