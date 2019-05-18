// var moment = require('moment');
let token = sessionStorage.getItem('token');

function getMonth () {
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: `/history/month?year=2019&month=${getUrlVars()["month"]}`,
      method: "GET",
      success: function (res) {
          spinner.stop();
          console.log(res);
          $('#mp').html(`<span id="price">${res.month_price}</span><span id="won"></span>`);
          let eventJson = [];
          let defaultMonth = String(getUrlVars()["month"]);
          if (defaultMonth.length == 1) {
            defaultMonth = "0"+defaultMonth;
          }
          for (let i = 1; i <= Object.keys(res.day_price).length; i++) {
            if(res.day_price[i] !== 0) {
              let eventDate = String(i);
              if (eventDate.length == 1) {
                eventDate = "0"+eventDate;
              }
              eventJson.push({title: `${res.day_price[i]}원`, start: `2019-${defaultMonth}-${eventDate}`, color: '#1a323d', textColor: 'white'});
                $('.day-content').append(`<div id="day" class="card">
                  <div class="card-body">
                  <div>${getUrlVars()["month"]}월${i}일</div>
                  <div>${res.day_price[i]}원</div>
                </div></div>`);
            }
          }
          let calendarEl = document.getElementById('calendar');
          var calendar = new FullCalendar.Calendar(calendarEl, {
                height: 500,
                plugins: [ 'dayGrid' ],
                defaultDate: `2019-${defaultMonth}`,
                events: [
                ],
                customButtons: {
                    exit: {
                        text: 'X',
                        click: function() {
                           $('.card-calendar').fadeOut(200);
                        }
                    }
                },
                header: {
                    left: '',
                    center: 'title',
                    right: 'exit'
                },
                events: eventJson,
              });
          calendar.render();
          $('#price').counterUp({
          delay: 10, // the delay time in ms
          time: 1000 // the speed time in ms
          });
          $('#won').append('원').delay(1000);
      },
      error: function (e) {
          spinner.stop();
          console.log(e.responseText);
          console.log('ajax call error: login page - loginReq');
          let jsonData = JSON.parse(e.responseText);
          alert(jsonData.message);
          // window.location.replace('/');
      }
  };
  sendTokenReq(info, token);
}

function getPrev () {
  // spinner = new Spinner(opts).spin(target);
  const info = {
      url: `/history/prev?month=${getUrlVars()["month"]}`,
      method: "GET",
      success: function (res) {
          // spinner.stop();
          console.log(res);
          let diffPrice = res.diff_price;
          let diffText = "더 쓰셨네요!";
          if(diffPrice < 0) {
            diffText = "덜 쓰셨네요!";
            diffPrice = Math.abs(diffPrice);
          }
          $('#month-footer').html(`<span>전월 대비 </span><span id="diffPrice">${diffPrice}</span><span>원 ${diffText}</span>`);
          $('#diffPrice').counterUp({
          delay: 10, // the delay time in ms
          time: 1000 // the speed time in ms
          });
          Highcharts.chart('chart', {
              chart: {
                backgroundColor: 'white',
                  type: 'column'
              },
              title: {
                  text: ''
              },
              xAxis: {
                  		lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                labels: {
                 enabled: true
             },
             minorTickLength: 0,
             tickLength: 0,
                  type: 'category'
              },
              yAxis: {
              		lineWidth: 0,
                minorGridLineWidth: 0,
                gridLineColor: 'transparent',
                lineColor: 'transparent',
                labels: {
                 enabled: false
             },
             minorTickLength: 0,
             tickLength: 0,
                  title: {
                      text: ''
                  }

              },
              legend: {
                  enabled: false
              },
              plotOptions: {
                  series: {
                      borderWidth: 0,
                      dataLabels: {
                          enabled: true,
                          format: '{point.y}'
                      }
                  }
              },

              tooltip: {
                  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                  pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
              },

              series: [
                  {
                      name: "",
                      colorByPoint: true,
                      data: [
                          {
                              name: "전월",
                              y: res.prev_price,
                              color: '#F5C89C',
                              // color: '#d65351',
                          },
                          {
                              name: "당월",
                              y: res.now_price,
                              color: '#cbb889',
                          },
                      ]
                  }
              ],
          });
      },
      error: function (e) {
          spinner.stop();
          console.log(e.responseText);
          console.log('ajax call error: login page - getPrev');
          // let jsonData = JSON.parse(e.responseText);
          alert('로그인을 해주세요!');
          window.location.replace('/');
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
  getMonth();
  getPrev();
  $('#month-header').html(`고객님의 ${getUrlVars()["month"]}월 지출 금액 입니다`);
  $('#prev').click(() => {
    window.location.replace(`/lobby?month=${moment(getUrlVars()["month"], 'M').subtract(1, 'months').format('M')}`);
  })
  $('#next').click(() => {
    if(getUrlVars()["month"] === moment().format('M')) {
      alert('마지막 페이지 입니다!');
    } else {
      window.location.replace(`/lobby?month=${moment(getUrlVars()["month"], 'M').add(1, 'months').format('M')}`);
    }
  })
  $('.card-calendar').hide();
  $('button.btn-calender').click(() => {
    $('.card-calendar').fadeIn(300);
  });
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
