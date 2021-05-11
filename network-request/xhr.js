// 非promise版本
function createXHR() {
  function getSerialParam(param) {
    let serialParams = '';
    for (const [key, value] of Object.entries(param)) {
      serialParam += `${key}=${value}&`;
    }
    return serialParams;
  }
  function post(url, param, callback) {
    const xhr = new XMLHttpRequest();
    const params= getSerialParam(param);
    xhr.open('post', url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-formurlencoded');
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4) {
        if ((xhr.status === 200 && xhr.status < 300) || xhr.status === 304) {
          callback(xhr.responseText);
        } else {
          throw new Error('没有符合条件的');
        }
      }
    }
    xhr.send(params);
  }

  function get(url, param, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'get',
      url + (url.inclueds('?') ? '' : '?') + getSerialParam(param),
      true
    );
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4) {
        if ((xhr.status === 200 && xhr.status < 300) || xhr.status === 304) {
          callback(xhr.responseText);
        } else {
          throw new Error('没有符合条件的');
        }
      }
    };
    xhr.send(null);
  }

  return {
    get,
    post,
  };
}
