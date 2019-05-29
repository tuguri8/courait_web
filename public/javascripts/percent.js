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
      Highcharts.chart('chart', {
        chart: {
          // backgroundColor: 'white',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: {
          text: '',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
          },
        },
        series: [{
          name: '점유율',
          colorByPoint: true,
          data: [{
            name: '패션',
            y: res.fashion.percent,
            color: '#a8ccf7',
          }, {
            name: '화장품/미용',
            y: res.cosmetic.percent,
            color: '#e28b99',
          }, {
            name: '디지털/가전',
            y: res.digital.percent,
            color: '#cdb297',
          }, {
            name: '가구/인테리어',
            y: res.interior.percent,
            color: '#1a323d',
          }, {
            name: '출산/육아',
            y: res.kid.percent,
            color: '#9c7bbe',
          }, {
            name: '식품',
            y: res.food.percent,
            color: '#a4c09d',
          }, {
            name: '스포츠/레저',
            y: res.sports.percent,
            color: '#e49535',
          }, {
            name: '생활/건강',
            y: res.life.percent,
            color: '#5a6fc5',
          }, {
            name: '여행/문화',
            y: res.culture.percent,
            color: '#F2DD85',
          }],
        }],
      });
      let data = [{
        name: '패션',
        percent: res.fashion.percent,
      }, {
        name: '화장품/미용',
        percent: res.cosmetic.percent,
      }, {
        name: '디지털/가전',
        percent: res.digital.percent,
      }, {
        name: '가구/인테리어',
        percent: res.interior.percent,
      }, {
        name: '출산/육아',
        percent: res.kid.percent,
      }, {
        name: '식품',
        percent: res.food.percent,
      }, {
        name: '스포츠/레저',
        percent: res.sports.percent,
      }, {
        name: '생활/건강',
        percent: res.life.percent,
      }, {
        name: '여행/문화',
        percent: res.culture.percent,
      }];
      console.log(data);
      data = _.sortBy(data, 'percent').reverse();
      for (let i = 0; i < data.length; i++) {
        $('.day-content').append(`<div id="day" class="card">
              <div class="card-header">${i + 1}위</div>
              <div class="card-body">
              <div class="">
                <span>${data[i].name}</span>
              </div>
              <div class="">${data[i].percent}%</div>
            </div></div>`);
      }
      // $('#month-footer').html(`<span>${subText}</span>`);
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

function excel() {
  const month = $('#excel-month').val();
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: `/history/excel?year=2019&month=${month}`,
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      window.open(`${res.url}`);
      $('#excel').modal('toggle');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: lobby page - excelReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
    },
  };
  sendTokenReq(info, token);
}

$(document).ready(() => {
  percent();
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
  $('#excel-btn').click(() => {
    excel();
  });
  $('#logo').click(() => {
    window.location.replace(`/history/month?month=${moment().format('M')}`);
  });
});
