// var moment = require('moment');
const token = sessionStorage.getItem('token');

function getMonth() {
  spinner = new Spinner(opts).spin(target);
  const info = {
    url: `/history/month?year=2019&month=${getUrlVars().month}`,
    method: 'GET',
    success(res) {
      spinner.stop();
      console.log(res);
      $('#mp').html(`<span id="price">${res.month_price}</span><span id="won"></span>`);
      const eventJson = [];
      let defaultMonth = String(getUrlVars().month);
      if (defaultMonth.length === 1) {
        defaultMonth = `0${defaultMonth}`;
      }
      for (let i = 1; i <= Object.keys(res.day_price).length; i++) {
        if (res.day_price[i] !== 0) {
          let eventDate = String(i);
          if (eventDate.length === 1) {
            eventDate = `0${eventDate}`;
          }
          eventJson.push({
            title: `${res.day_price[i]}원`, start: `2019-${defaultMonth}-${eventDate}`, color: '#1a323d', textColor: 'white',
          });
          $('.day-content').append(`<div id="day" class="card">
                  <div class="card-body">
                  <div>${getUrlVars().month}월${i}일</div>
                  <div>${res.day_price[i]}원</div>
                </div></div>`);
        }
      }
      const calendarEl = document.getElementById('calendar');
      const calendar = new FullCalendar.Calendar(calendarEl, {
        height: 500,
        plugins: ['dayGrid'],
        defaultDate: `2019-${defaultMonth}`,
        events: [
        ],
        customButtons: {
          exit: {
            text: 'X',
            click() {
              $('.card-calendar').fadeOut(200);
            },
          },
        },
        header: {
          left: '',
          center: 'title',
          right: 'exit',
        },
        events: eventJson,
      });
      calendar.render();
      $('#price').counterUp({
        delay: 10, // the delay time in ms
        time: 1000, // the speed time in ms
      });
      $('#won').append('원').delay(1000);
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

function getPrev() {
  // spinner = new Spinner(opts).spin(target);
  const info = {
    url: `/history/prev?month=${getUrlVars().month}`,
    method: 'GET',
    success(res) {
      // spinner.stop();
      console.log(res);
      let diffPrice = res.diff_price;
      let diffText = '더 쓰셨네요!';
      if (diffPrice < 0) {
        diffText = '덜 쓰셨네요!';
        diffPrice = Math.abs(diffPrice);
      }
      $('#month-footer').html(`<span>전월 대비 </span><span id="diffPrice">${diffPrice}</span><span>원 ${diffText}</span>`);
      $('#diffPrice').counterUp({
        delay: 10, // the delay time in ms
        time: 1000, // the speed time in ms
      });
      Highcharts.chart('chart', {
        chart: {
          backgroundColor: 'white',
          type: 'column',
        },
        title: {
          text: '',
        },
        xAxis: {
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          labels: {
            enabled: true,
          },
          minorTickLength: 0,
          tickLength: 0,
          type: 'category',
        },
        yAxis: {
          lineWidth: 0,
          minorGridLineWidth: 0,
          gridLineColor: 'transparent',
          lineColor: 'transparent',
          labels: {
            enabled: false,
          },
          minorTickLength: 0,
          tickLength: 0,
          title: {
            text: '',
          },

        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y}',
            },
          },
        },

        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>',
        },

        series: [
          {
            name: '',
            colorByPoint: true,
            data: [
              {
                name: '전월',
                y: res.prev_price,
                color: '#F5C89C',
                // color: '#d65351',
              },
              {
                name: '당월',
                y: res.now_price,
                color: '#cbb889',
              },
            ],
          },
        ],
      });
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: login page - getPrev');
      // let jsonData = JSON.parse(e.responseText);
      alert('로그인을 해주세요!');
      window.location.replace('/auth/login');
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
  getMonth();
  getPrev();
  $('#month-header').html(`고객님의 ${getUrlVars().month}월 지출 금액 입니다`);
  $('#prev').click(() => {
    window.location.replace(`/history/month?month=${moment(getUrlVars().month, 'M').subtract(1, 'months').format('M')}`);
  });
  $('#next').click(() => {
    if (getUrlVars().month === moment().format('M')) {
      alert('마지막 페이지 입니다!');
    } else {
      window.location.replace(`/history/month?month=${moment(getUrlVars().month, 'M').add(1, 'months').format('M')}`);
    }
  });
  $('.card-calendar').hide();
  $('button.btn-calender').click(() => {
    $('.card-calendar').fadeIn(300);
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
  $('#logo').click(() => {
    window.location.replace(`/history/month?month=${moment().format('M')}`);
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
});
