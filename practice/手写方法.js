// 节流
// 频繁操作下,按照固定时间执行代码,有稀释函数执行次数的特点.
// 1.时间戳的方式
function throttle(fn, time = 500) {
  let preDate = Date.now();

  return () => {
    let nowDate = Date.now();
    if (nowDate - preDate >= time) {
      fn.call(null, ...arguments);
      preDate = nowDate;
    }
  }
}
// 2. settimeout的方式
function throttle1(fn, timeout= 500) {
  let timer = null;
  return (...rest) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(null, rest);
      timer = null;
    }, timeout);
  }
}
var fn = throttle(function name() {
  console.log(123);
}, 1000);

// 闭包
var fn = function () {
  var n = 0;
  function add() {
    n++;
    console.log(n);
  }

  return { n, add}
}

var result = fn();
var result1 = fn();
result.add(); // 1
result.add(); // 2

// 手写myCall
Function.prototype.myCall = function (o) {
  // 还需要判断是否是一个函数
  if (typeof this !== 'function') {
    throw new TypeError('this not a function!');
  }

  const context = o ?? window;
  // 避免函数名重复
  const symbol = Symbol('call');
  context[symbol] = this;

  const args = [...arguments].slice(1);
  const result = context[symbol](...args);
  delete context[symbol];
  return result;
};

Function.prototype.myApply = function (o) {
  // 还需要判断是否是一个函数
  if (typeof this !== 'function') {
    throw new TypeError('this not a function!');
  }
  const context = o ?? window;
  const symbol = Symbol('apply');
  context[symbol] = this;
  const args = [...arguments].slice(1)[0];
  const result = context[symbol](...args);

  delete context[symbol];
  return result;
}
var obj = {name: 'abc'};
// log.myCall(obj)
console.log.myApply(obj);

// queueMicrotask新的一种微任务的测试
console.log('123');
queueMicrotask(() => {
  console.log(234);
});
Promise.resolve().then(() => {
  console.log(34343);
});
console.log('end');

// promise执行顺序练习
var p = function () {
  return new Promise((resolve) => {
    var p = new Promise((resolve) => {
      resolve();
    });
    resolve();
    p.then(() => {
      console.log(1);
    })
  });
};
p().then(() => { // 1 2 3 4
  console.log('2');
  var p1 = new Promise((resolve) => {
    resolve();
  });
  p1.then(() => {
    console.log(3);
  });
}).then(() => {
  console.log(4);
});

// 输出[1, 2, 3]
var timeout = ms => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, ms);
});
var ajax1 = () => timeout(2000).then(() => {
  console.log('1');
  return 1;
});
var ajax2 = () => timeout(1000).then(() => {
  console.log('2');
  return 2;
});
var ajax3 = () => timeout(2000).then(() => {
  console.log('3');
  return 3;
});
var mergePromise = (ajaxArray) => {
  const promiseArray = [...ajaxArray];
  const valueArray = [];
  // 建议使用reduce, 万能
  const results = promiseArray.reduce((prev, cur) => {
    return prev.then(() => {
      return cur().then((data) => {
        valueArray.push(data);
        return valueArray;
      })
    });
  }, Promise.resolve());
  return results;
};
mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});

// 嵌套超过5层的settimeout才会默认将timeout设置为4ms
setTimeout(() => {
  console.log(1);
}, 1);
setTimeout(() => {
  console.log(0);
}, 0);
setTimeout(() => {
  console.log(2);
}, 2);

// 无关联的函数使用并发执行
async function foo() {
  const x = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
  return x;
}
async function bar() {
  const x = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
  return x;
}
(async function foo1() {
  try {
    const foo1 = foo();
    const bar1 = bar();
    const tempFoo = await foo1;
    const tempBar = await bar1;
    return { tempFoo, tempBar };
  } catch (error) {
    throw 'error';
  }
})();

var p = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  })
}
async function asyncfn() {
  try {
    return await p();
  } finally {
    return 5;
  }
}
asyncfn().then((message) => {
  console.log(message);
});

// 关于执行顺序(node中)
const promise = Promise.resolve()
setImmediate(() => {
  console.log('setImmediate');
});
promise.then(()=>{
  console.log('promise');
})
process.nextTick(()=>{
  console.log('nextTick');
})

// 维持同时有3个请求在执行
var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
  'https://www.kkkk1000.com/images/getImgData/gray.gif',
  'https://www.kkkk1000.com/images/getImgData/Particle.gif',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
  'https://www.kkkk1000.com/images/wxQrCode2.png',
];
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('一张图片加载完成');
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
};
function loadImage1(urls, handler, limit) {
  // 拷贝副本
  let tempUrls = [...urls];
  // first执行的3个urls
  let urlsLoadsFirst = tempUrls.splice(0, limit);
  let promises = urlsLoadsFirst.map((url, index) => {
    return handler(url).then(() => index);
  });
  return tempUrls
    .reduce((prev, cur) => {
      return prev
        .then(() => {
          return Promise.race(promises);
        })
        .catch((err) => {
          console.error(err);
        })
        .then((idx) => {
          promises[idx] = handler(cur).then((idx) => idx);
        });
    }, Promise.resolve())
    .then(() => {
      // 最后三个url
      return Promise.all(promises);
    });
}
limitLoad(urls, loadImg, 3);

function limitLoad(urls, handler, limit) {
  const urlsArray = [...urls];
  const promises = urlsArray.splice(0, limit).map((item, index) => {
    return handler(item).then(() => index);
  });
  return urlsArray
    .reduce((prev, cur) => {
      return prev
        .then(() => {
          return Promise.race(promises);
        })
        .catch((error) => {
          return error;
        })
        .then((idx) => {
          return (promises[idx] = handler(cur).then(() => idx));
        });
    }, Promise.resolve())
    .then(() => {
      return Promise.all(promises);
    });
}
limitLoad(urls, loadImg, 3);


var numbers = [1, 2, 3, 4, 5, 6];
var results = [];
function async(arg, callback) {
  console.log('参数为 ' + arg +' , 1秒后返回结果');
  setTimeout(function () { callback(arg * 2); }, 1000);
};
function final(value) {
  console.log('完成: ', value);
};
// 并行
numbers.forEach((element) => {
  async(element, function (result) {
    results.push(result);
    if (results.length === numbers.length) {
      final(results[results.length - 1]);
    }
  });
});

var numbers = [1, 2, 3, 4, 5, 6];
var results = [];
var count = 2;
var running = 0;
// 并行 + 串行
function executor() {
  while (running < count && numbers.length > 0) {
    var item = numbers.shift();
    async(item, function (result) {
      running--;
      results.push(result);
      if (numbers.length > 0) {
        executor();
      } else if (running === 0) {
        final(results[results.length - 1]);
      }
    });
    running++;
  }
};
executor();

function timer1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(555);
    }, 500);
  });
}
function timer2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(666);
    }, 500);
  });
}
Promise.all([timer1(), timer2()]).then(([a]) => {
  console.dir(a);
});

