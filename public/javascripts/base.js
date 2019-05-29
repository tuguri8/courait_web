// const URL = 'http://ec2-52-78-171-9.ap-northeast-2.compute.amazonaws.com:7001';
// const URL = 'http://192.9.44.53:65003';
const URL = 'http://203.249.127.32:65003';
// const URL = 'http://localhost:6001';
// const URL = 'http://localhost:65003';

const opts = {
  lines: 10,
  length: 20,
  width: 12,
  radius: 42,
  scale: 0.5,
  corners: 1,
  color: '#374034',
  fadeColor: 'transparent',
  opacity: 0.25,
  rotate: 0,
  direction: 1,
  speed: 1,
  trail: 60,
  fps: 20,
  zIndex: 2e9,
  className: 'spinner',
  top: '50%',
  left: '50%',
  shadow: false,
  hwaccel: false,
  position: 'absolute',
};
const target = document.getElementById('spinner');
let spinner;

//
// function sendReq(info) {
//     // console.log("info.error: "+info.error)
//     if(!info.error){
//         info.error = function(e){
//             console.log('ajax call error');
//             console.log(e);
//             console.log(e.responseText);
//         }
//     }
//
//     $.ajax(URL + info.url, {
//         crossDomain:true,
//         method: info.method,
//         data: info.body,
//         success: info.success,
//         error: info.error
//     });
// }

function getUrlVars() {
  const vars = []; let
    hash;
  const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function sendReq(info) {
  if (!info.error) {
    info.error = function (e) {
      console.log('ajax call error');
      console.log(e);
    };
  }

  $.ajax(URL + info.url, {
    method: info.method,
    crossDomain: true,
    xhrFields: {
      withCredentials: true,
    },
    data: info.body,
    success: info.success,
    error: info.error,
  });
}

function sendTokenReq(info, token) {
  if (!info.error) {
    info.error = function (e) {
      console.log('ajax call error');
      console.log(e);
    };
  }

  $.ajax(URL + info.url, {
    method: info.method,
    crossDomain: true,
    beforeSend(xhr) {
      xhr.setRequestHeader('x-access-token', token);
    },
    xhrFields: {
      withCredentials: true,
    },
    data: info.body,
    success: info.success,
    error: info.error,
  });
}

function getCategory(category) {
  switch (category) {
    case 'fashion':
      return '패션';
    case 'cosmetic':
      return '화장품/미용';
    case 'digital':
      return '디지털/가전';
    case 'interior':
      return '가구/인테리어';
    case 'kid':
      return '출산/육아';
    case 'food':
      return '식품';
    case 'sports':
      return '스포츠/레저';
    case 'life':
      return '생활/건강';
    case 'culture':
      return '여행/문화';
    default:
      break;
  }
}

function getFoodCategory(category) {
  switch (category) {
    case 'meat':
      return '축산';
    case 'fish':
      return '수산';
    case 'agriculture':
      return '농산물';
    case 'banchan':
      return '반찬';
    case 'kimchi':
      return '김치';
    case 'snack':
      return '과자';
    case 'beverage':
      return '음료';
    case 'icecream':
      return '아이스크림';
    case 'frozen':
      return '냉동/간편조리식품';
    case 'gagong':
      return '가공식품';
    case 'health':
      return '건강식품';
    default:
      break;
  }
}
