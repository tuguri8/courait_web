// var moment = require('moment');
const token = sessionStorage.getItem('token');

function getPurchaseList() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: `/admin/history?phone=${getUrlVars().phone}`,
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      $('.day-title').append(`<span>${decodeURI(getUrlVars().name)}님의 구매내역</span>`);
      for (let i = 0; i < res.purchase_list.length; i++) {
        $('.day-content').append(`<div id="day" class="card">
              <div class="card-header">
                <span>${getCategory(res.purchase_list[i].category)}</span>
                <span>${res.purchase_list[i].purchase_date}</span>
              </div>
              <div class="card-body">
              <div class="">
                <span>${res.purchase_list[i].item_name}</span>
              </div>
              <div class="">${res.purchase_list[i].price}원</div>
            </div></div>`);
      }
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: lobby page - AdminGetPurchaseListReq');
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
  getPurchaseList();
  $('#logout').click(() => {
    logout();
  });
  $('#logo').click(() => {
    window.location.replace('/admin/user/info');
  });
});
