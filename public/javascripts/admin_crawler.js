// var moment = require('moment');
const token = sessionStorage.getItem('token');

function getCrawlerStatus() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/admin/crawler/status',
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      let status = '작동중';
      let buttonHTML = '<button id="stop_crawler" type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#feedback">크롤러 중단하기</button>';
      if (res.status === false) {
        status = '작동중지';
        buttonHTML = '<button id="start_crawler" type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#feedback">크롤러 시작하기</button>';
      }
      const dayArr = (res.day).split(',');
      const crawlingDay = [];
      dayArr.forEach((data) => {
        let result;
        switch (data) {
          case '0':
            result = '일요일';
            break;
          case '1':
            result = '월요일';
            break;
          case '2':
            result = '화요일';
            break;
          case '3':
            result = '수요일';
            break;
          case '4':
            result = '목요일';
            break;
          case '5':
            result = '금요일';
            break;
          case '6':
            result = '토요일';
            break;
          default:
            break;
        }
        crawlingDay.push(result);
      });
      $('#day').remove();
      $('.day-content').append(`
        <div id="day" class="card">
          <div class="card-header">
            <span>크롤러 상태 :&nbsp;</span>
            <span>${status}</span>
          </div>
          <div class="card-body">
            <span>크롤링 요일 :&nbsp;</span>
            <span>${String(crawlingDay)}</span>
          </div>
          <div class="card-footer">
            <button id="set_crawling_day" type="button" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#crawling_day" style="margin-right:2%;">크롤링 요일 설정</button>
            ${buttonHTML}
          </div>
        </div>`);
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

function updateCrawlingDay() {
  spinner = new Spinner(opts).spin(target);
  const checked_array = [];
  $('.checkbox:checked').each(function () {
    checked_array.push(this.id);
  });
  const info = {
    url: '/admin/crawler/day',
    method: 'POST',
    body: {
      day: String(checked_array),
    },
    success(res) {
      spinner.stop();
      console.log('feedbackReq success');
      alert(res.message);
      $('#crawling_day').modal('toggle');
      getCrawlerStatus();
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: admin crawler page - updateCrawlingDayReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

function stopCrawler() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/admin/crawler/status',
    method: 'POST',
    body: {
      status: false,
    },
    success(res) {
      spinner.stop();
      console.log('stopCrawlwerReq success');
      alert(res.message);
      getCrawlerStatus();
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: admin crawler page - stopCrawlwerReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

function startCrawler() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/admin/crawler/status',
    method: 'POST',
    body: {
      status: true,
    },
    success(res) {
      spinner.stop();
      console.log('startCrawlerReq success');
      alert(res.message);
      getCrawlerStatus();
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: admin crawler page - startCrawlerReq');
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

$(document).ready(() => {
  getCrawlerStatus();
  $('#logout').click(() => {
    logout();
  });
  $('#crawling-day-btn').click(() => {
    updateCrawlingDay();
  });
  $('body').on('click', '#stop_crawler', () => {
    stopCrawler();
  });
  $('body').on('click', '#start_crawler', () => {
    startCrawler();
  });
  $('#logo').click(() => {
    window.location.replace('/admin/user/info');
  });
});
