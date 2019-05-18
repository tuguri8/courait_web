// var moment = require('moment');
let token = sessionStorage.getItem('token');

function compareBudget () {
  spinner = new Spinner(opts).spin(target);
  const info = {
      url: '/history/budget',
      method: "GET",
      success: function (res) {
          spinner.stop();
          console.log(res);
          let mpText;
          let subText;
          $('#mp').html(`<span id="price">${res.diff_price}</span><span id="won"></span>`);
          if (res.over === true) {
            mpText = '더 쓰셨네요!';
            subText = '다음에는 소비를 줄이셔야 해요!';
            $('#price').css('color', '#d1072d');
          } else {
            mpText = '덜 쓰셨네요!';
            subText = `하루에 ${res.rest_price}원 씩 쓰셔야 해요!`;
            $('#price').css('color', '#105386');
          }
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
                              name: "예산",
                              y: res.budget,
                              color: '#F5C89C',
                              // color: '#d65351',
                          },
                          {
                              name: "당월 지출",
                              y: res.month_price,
                              color: '#CCA06F',
                          },
                      ]
                  }
              ],
          });
          $('#price').counterUp({
          delay: 10, // the delay time in ms
          time: 1000 // the speed time in ms
          });
          $('#won').append(`원 ${mpText}`).delay(1000);
          $('#month-footer').html(`<span>${subText}</span>`);
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
  compareBudget();
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
