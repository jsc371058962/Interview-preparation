var log = function (strings) {
  console.log(strings);
}

// 节流

// 频繁的操作下，只在固定的时间执行
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

var fn = throttle(function name() {
  console.log(123);
}, 1000);

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
result.add();
result.add();

Function.prototype.myCall = function (o) {
  const context = o ?? window;
  context.fn = this;

  const args = [...arguments].slice(1);
  const result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.myApply = function (o) {
  const context = o ?? window;
  context.fn = this;

  const args = [...arguments].slice(1);
  const result = context.fn(args);

  Reflect.deleteProperty(context, 'fn');
  return result;
}

function log() {
  console.log(this.name)
}

var obj = {name: 'abc'};

// log.myCall(obj)
log.myApply(obj);

console.log('123');

queueMicrotask(() => {
  console.log(234);
})

Promise.resolve().then(() => {
  console.log(34343);
});

console.log('end');


var p = function (params) {
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

p.then(() => {
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
  // 在这里实现你的代码
  var data = [];
  var promise = Promise.resolve();

  ajaxArray.forEach((ele) => {
    promise = promise.then(ele).then((d) => {
      data.push(d);
      return data;
    });
  });

  return promise;
};

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('done');
  console.log(data); // data 为 [1, 2, 3]
});


function fn({ flag = true}) {
  console.log(flag);
}
fn()

setImmediate(() => {
  console.log(2)
}, 0)
setTimeout(() => {
  console.log(1)
}, 0);


async function foo() {
  const x = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 500);
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

async function foo1() {
  try {
    const foo1 = foo();
    const bar1 = bar();
    const tempFoo = await foo1;
    const tempBar = await bar1;
    return { tempBar, tempFoo};
  } catch (error) {
    throw 'error';
  }
}

foo1();

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


var flag = true;

var obj = {
  flag: true,
  content() {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('content')
      if (this.flag) {
        resolve('web page content')
      } else {
        reject(new Error('error happens'))
      }
    })
    })
  },
  close() {
    console.log('close')

    this.flag = false;
  }
}

var f2 = async () => {
  try {
    return obj.content()
  } finally {
    obj.close()
  }
}

var f3 = async () => {
  try {
    return await obj.content()
  } finally {
    obj.close()
  }
}

var main = async () => {
  var content = await f3()
  console.log('got content')

  console.log(content)
}

main();


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

function loadImage1(handler, urls, limit) {
  // 拷贝副本
  let tempUrls = [...urls];
  // first执行的3个urls
  let urlsLoadsFirst = tempUrls.splice(0, limit);
  let promises = urlsLoadsFirst.map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });
  return tempUrls.reduce((prev, cur, curIndex) => {
    return prev.then(() => {
      return Promise.race(promises);
    }).catch((err) => {
      console.error(err);
    }).then((loadedIndex) => {
      promises[loadedIndex] = handler(curIndex).then((index) => {
        return index;
      });
    });
  }, Promise.resolve()).then(() => {
    // 最后三个url
    return Promise.all(promises);
  });
}

function limitLoad(urls, handler, limit) {
  // 对数组做一个拷贝
  const sequence = [...urls];

  let promises = [];

  //并发请求到最大数
  promises = sequence.splice(0, limit).map((url, index) => {
    // 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标
    return handler(url).then(() => {
      return index;
    });
  });

  // 利用数组的 reduce 方法来以队列的形式执行
  return sequence.reduce((last, url, currentIndex) => {
    return last.then(() => {
      // 返回最快改变状态的 Promise
      return Promise.race(promises);
    }).catch(err => {
      // 这里的 catch 不仅用来捕获前面 then 方法抛出的错误
      // 更重要的是防止中断整个链式调用
      console.error(err);
    }).then((res) => {
      // 用新的 Promise 替换掉最快改变状态的 Promise
      promises[res] = handler(sequence[currentIndex]).then(() => {
        return res;
      });
    })
  }, Promise.resolve()).then(() => {
    return Promise.all(promises);
  })

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

var set = new Set([1, 2, 3]);
function test(set) {
  console.log(set);
}

test.apply(null, set);
