function debounce(fn, timeout = 500, immediate = false) {
  let timer = null;
  return function (...params) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const isCallNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
      if (isCallNow) fn(...params);
    } else {
      timer = setTimeout(() => {
        fn(...params);
      }, timeout);
    }
  };
}
// 延时器
function throttle(fn, timeout = 500) {
  let timer = null;
  return function (...params) {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...params);
      timer = null;
    }, timeout);
  };
}
// 时间戳
function throttle(fn, timeout = 500) {
  let prevTime = Date.now();
  return function (...params) {
    if (Date.now() - prevTime >= timeout) {
      fn(...params);
      prevTime = Date.now();
    }
  };
}

// F(2)(3)(4)
function multiplyNumbers(a, b, c) {
  return a * b * c;
}
function curry(fn, ...args) {
  const len = fn.length;
  return function (...rest) {
    rest = [...args, ...rest];
    if (rest.length >= len) {
      return fn.call(null, ...rest);
    } else {
      return curry(fn, ...rest);
    }
  };
}
const multiplyFn = curry(multiplyNumbers);
console.log(multiplyFn(2)(3)(4));

// 实现map
Array.prototype.map = function (callback, thisArgs) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const length = O.length >>> 0;
  let k = 0,
    res = [];
  while (k < length) {
    for (const key in O) {
      if (Object.hasOwnProperty.call(O, key)) {
        res[key] = callback.call(thisArgs, O[key], key, O);
      }
    }
    k++;
  }
  return res;
};
