// var moment = require('moment');
const token = sessionStorage.getItem('token');

function input() {
  const name = $('#item-name').val();
  const price = $('#price').val();
  const date = $('#datepicker').val();

  spinner = new Spinner(opts).spin(target);
  const info = {
    url: '/history/new',
    method: 'POST',
    body: {
      name,
      price,
      date,
    },
    success(res) {
      spinner.stop();
      console.log('inputReq success');
      if (res.category === 'food') {
        alert(`${getCategory(res.category)}, ${getFoodCategory(res.food_category)} 카테고리의 ${res.item_name}가 등록되었습니다.`);
      } else {
        alert(`${getCategory(res.category)} 카테고리의 ${res.item_name}이(가) 등록되었습니다.`);
      }
      $('#item-name').val('');
      $('#price').val('');
      $('#datepicker').val('');
    },
    error(e) {
      spinner.stop();
      console.log(e.responseText);
      console.log('ajax call error: input page - inputReq');
      const jsonData = JSON.parse(e.responseText);
      alert(jsonData.message);
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
  $('#item-input-btn').click(() => {
    input();
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
  $('#datepicker').datepicker({
    dateFormat: 'yy-mm-dd',
  });
  $('#withdrawl-btn').click(() => {
    withdrawl();
  });
  $('#excel-btn').click(() => {
    excel();
  });
  $('#logo').click(() => {
    window.location.replace('/user/guide');
  });
  $('#item-name').autocomplete({
    minLength: 0,
    source(request, response) {
      let term = request.term;
      let cache = {};
      if ( term in cache ) {
        response( cache[ term ] );
        return;
      }

      if (term === '') {
        const info = {
          url: '/history/list',
          method: 'GET',
          success(res) {
            console.log(res);
            cache[ term ] = res;
            response(res);
          },
          error(e) {
            console.log(e.responseText);
            console.log('ajax call error: lobby page - excelReq');
            cache[ term ] = res;
            response([]);
          },
        };
        sendTokenReq(info, token);
      } else {
        const info = {
          url: `/history/search?term=${term}`,
          method: 'GET',
          success(res) {
            console.log(res);
            cache[ term ] = res;
            response(res);
          },
          error(e) {
            console.log(e.responseText);
            console.log('ajax call error: lobby page - excelReq');
            cache[ term ] = res;
            response([]);
          },
        };
        sendTokenReq(info, token);
      }
    },
    select(event, ui) {
      if(ui.item.item_name) {
        $('#item-name').val(ui.item.item_name);
        // $('#input-button').click();
      } else {
        $('#item-name').val(ui.item.value);
        // $('#input-button').click();
      }
      return false;
    },
    focus(event, ui) {
      if (ui.item.item_name) {
        $('#item-name').val(ui.item.item_name);
      } else {
        $('#item-name').val(ui.item.value);
      }
      return false;
    },
    appendTo: "#m",
    autoFocus: false,
    // position: { my: "right bottom", at: "right top" },
  }).data('ui-autocomplete')._renderItem = function(ul, item) {
    if (item.item_name) {
      return $('<li></li>')
        .data('ui-autocomplete-item', item)
        .append(`<div style="display:flex; justify-content:space-between;"><span>${item.item_name}</span> <span>${item.purchase_date}</span></div>`)
        .appendTo(ul);
    }
    return $('<li></li>')
      .data('ui-autocomplete-item', item)
      .append(`<div>${item.value}</div>`)
      .appendTo(ul);
  };
  $('#item-name').focus(function () {
    $(this).autocomplete('search', $(this).val());
  });
});
