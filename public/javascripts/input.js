// var moment = require('moment');
let token = sessionStorage.getItem('token');

function input() {
  let name = $('#item-name').val();
  let price = $('#price').val();
  let date = $('#datepicker').val();

  spinner = new Spinner(opts).spin(target);
  const info = {
      url: "/history/new",
      method: "POST",
      body: {
          name,
          price,
          date,
      },
      success: function (res) {
          spinner.stop();
          console.log('inputReq success');
          alert(`${getCategory(res.category)}의 ${res.item_name}가 등록되었습니다.`);
          $('#item-name').val('');
          $('#price').val('');
          $('#datepicker').val('');
      },
      error: function (e) {
          spinner.stop();
          console.log(e.responseText);
          console.log('ajax call error: input page - inputReq');
          let jsonData = JSON.parse(e.responseText);
          alert(jsonData.message);
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
  $('#item-input-btn').click(() => {
    input();
  })
  $('#logout').click(() => {
    logout();
  })
  $('#nav-month').click(() => {
    window.location.replace(`/lobby?month=${moment().format('M')}`);
  })
  $('#nav-day').click(() => {
    window.location.replace(`/day?month=${moment().format('M')}&day=${moment().format('D')}`);
  })
  $('#nav-input').click(() => {
    window.location.replace('/input');
  });
  $('#get-budget-btn').click(() => {
    window.location.replace('/budget');
  });
  $('#feedback-btn').click(() => {
    feedback();
  })
  $("#datepicker").datepicker({
    dateFormat: 'yy-mm-dd'
  });
  $('#withdrawl-btn').click(() => {
    withdrawl();
  });
});
