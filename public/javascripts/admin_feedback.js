// var moment = require('moment');
const token = sessionStorage.getItem('token');

function getFeedback() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/admin/feedback',
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      for (let i = 0; i < res.feedback_list.length; i++) {
        $('.day-content').append(`
          <div id="day" class="card">
            <div class="card-header">
              <span>${res.feedback_list[i].name}</span>
              <span>${res.feedback_list[i].date}</span>
            </div>
            <div class="card-body">
              <div class="">
                <span>${res.feedback_list[i].content}</span>
              </div>
            </div>
            <div class="card-footer">
              <span id="user_email" style="display: none;">${res.feedback_list[i].email}</span>
              <button id="answer_feedback" type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#feedback">메일로 답변하기</button>
            </div>
          </div>`);
      }
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: lobby page - AdminGetPurchaseListReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

function feedback() {
  const email = $('span#feedback_email').text();
  const content = $('#feedback-content').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/admin/mail',
    method: 'POST',
    body: {
      email,
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
      console.log('ajax call error: admin feedback page - feedbackReq');
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
  getFeedback();
  $('#logout').click(() => {
    logout();
  });
  $('body').on('click', '#answer_feedback', (e) => {
    $('span#feedback_email').text($(e.target).siblings('span#user_email').text());
  });
  $('#feedback-btn').click(() => {
    feedback();
  });
  $('#logo').click(() => {
    window.location.replace('/admin/user/info');
  });
});
