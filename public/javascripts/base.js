const URL = 'http://ec2-13-124-76-148.ap-northeast-2.compute.amazonaws.com:7001';
// const URL = 'http://localhost:6001';

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

// function recheckTokenExist (reqName) {
//     const info = {
//         url: "/api/v1/users/verify_token",
//         method: "POST",
//         success: function(res){
//             if(res.success) {
//                 console.log('dashboard : recheckTokenExist - token exists! fail');
//                 alert(reqName + '에 실패했습니다.');
//             }else {
//                 console.log("dashboard : recheckTokenExist - token may not exists......(Not sure)");
//                 console.log(res);
//                 window.location.replace(window.location.origin);
//             }
//         },
//         error: function(e){
//             console.log('ajax call error dashboard : reCheckTokenExist ');
//             if(!navigator.onLine){
//                 console.log("internet disconnected");
//                 window.location.reload();
//             } else if(e.status===0){
//                 console.log("status: 0");
//             } else {
//                 if (e.status === 403) {
//                     if (e.responseText.includes("No token provided."))
//                         console.log("No token.");
//                     else if (e.responseText.includes("jwt malformed"))
//                         console.log("Malformed token");
//                     else if (e.responseText.includes("invalid signature"))
//                         console.log("Modified token");
//                     window.location.replace(window.location.origin);
//                 } else if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
//                     console.log("check your URL, method(GET/POST)");
//                     alert(reqName + "에 실패했습니다.");
//                 } else {
//                     console.log("token may not exists......(Not sure)");
//                     console.log('status: ' + e.status + ', message: ' + e.responseText);
//                     console.log(e);
//                     window.location.replace(window.location.origin);
//                 }
//             }
//         }
//     };
//     sendTokenReq(info);
// }
