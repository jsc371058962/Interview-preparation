// before: [1,2,3,[1,2,3,4, [2,3,4]]]
// after flatDeep: [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]

// 1: forEach循环每个元素，是单个元素push，数组则递归
var temp1 = [];
function flatArray1(arr) {
  return arr.forEach((item) => {
    if (Array.isArray(item)) {
      flatArray1(item);
    } else {
      temp1.push(item);
    }
  });
}
flatArray1([1,2,3,[1,2,3,4, [2,3,4]]]);
console.log(temp1);

// 2. generator函数
var temp = [];
function *flatArray(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flatArray(item);
    } else {
      temp.push(item);
    }
  }
}
var it = flatArray([1,2,3,[1,2,3,4, [2,3,4]]]);
it.next();
console.log(temp);

// 3. Array.prototype.flat(Infinity)
function flatArray2(arr) {
  return arr.flat(Infinity);
}
var temp2 = flatArray2([1,2,3,[1,2,3,4, [2,3,4]]]);
console.log(temp2);

// 4. 这个不怎么好，改变了数据类型. number => string
function flatArray3(arr) {
  return arr.toString().split(',');
}
var temp3 = flatArray3([1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]);
console.log(temp3);

// 5. reduce
function flatArray4(arr) {
  return arr.reduce(
    (pre, cur) => pre.concat(Array.isArray(cur) ? flatArray4(cur) : cur),
    []
  );
}
var temp4 = flatArray4([1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]);
console.log(temp4);

// 6. some + isArray
function flatArray5(arr) {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  return arr;
}
var temp5 = flatArray5([1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]);
console.log(temp5);




var numbers = [1, 2, 3, 4, 5, 6];
var obj1 = {name: 'jin'};
numbers.forEach((value) => {
  console.log(this);
});

Function.prototype.myCall = function (o) {
  const ctx = o || window;
  // 添加方法, 此时调用call的上下文为this
  ctx.fn = this;
  // 获取参数
  const [, ...args] = arguments;
  const result = ctx.fn(...args);
  delete ctx.fn;
  return result;
};

Function.prototype.myApply = function (o) {
  const ctx = o || window;
  ctx.fn = this;
  const [, args] = arguments;
  const result = ctx.fn(...args);
  Reflect.deleteProperty(ctx, 'fn');
  return result;
}

Function.prototype.myBind = function (o) {
  const ctx = o || window;
  const that = this;
  return function () {
    ctx.fn = that;
    const args = [...arguments]; //数组
    const result = ctx.fn(...args);
    Reflect.deleteProperty(ctx, 'fn');
    return result;
  }
}

var o = {name: 'jin'}
function getName(a, b) {
  console.log(a, b);
  console.log(this.name);
}

// getName.myCall(o, 'abc', 345);

// getName.myApply(o, ['abc', 345]);

getName.myBind1(o)(1, 2);

Function.prototype.myCall1 = function (o) {
  // if o is null/undefined, ctx should be window.
  const ctx = o || window;
  // get function to be a property.
  ctx.fn = this;
  // get args, no need array.
  const [, ...args] = arguments;
  // execute the function.
  const result = ctx.fn(...args);
  // delete this function from ctx.
  Reflect.deleteProperty(ctx, 'fn');
  // return the result.
  return result;
}

Function.prototype.myApply1 = function (o) {
  const ctx = o || window;
  ctx.fn = this;
  const args = [...arguments].slice(1);
  const result = ctx.fn(...args);
  Reflect.deleteProperty(ctx, 'fn');
  return result;
}

Function.prototype.myBind1 = function (o) {
  const ctx = o || window;
  return (...args) => {
    ctx.fn = this;
    const result = ctx.fn(...args);
    Reflect.deleteProperty(ctx, 'fn');
    return result;
  }
}

// deepClone
var obj3 = {
  a: '1',
  b: {
    c: 2,
    d: 'g'
  }
}

function deepClone(o) {
  let result = void 0;
  if (typeof o === 'object') {
    result = Array.isArray(o) ? [] : {};
    for (const key in o) {
      // 不拷贝原型链上的数据属性
      if (o.hasOwnProperty(key)) {
        result[key] = typeof o[key] === 'object' ? deepClone(o[key]) : o[key];
      }
    }
  } else {
    result = o;
  }
  return result;
}

var newO = deepClone(obj3);
console.log(newO);


// 柯理化函数
function createCurry(func, args = []) {
  var argity = func.length;
  return function () {
    var _args = [...arguments];
    args.push(..._args);
    if (args.length < argity) {
      return createCurry(func, args);
    }
    return func(...args);
  }
}

function add(a, b, c, d) {
  return a + b + c + d;
}

var addf = createCurry(add);
console.log(addf(1)(2)(4)(5));


function curry(fn, ...args) {
  const paramLength = fn.length;
  return function () {
    const _args = [...arguments];
    args.push(..._args);
    if (args.length >= paramLength) {
      return fn(...args);
    }
    return curry(fn, args);
  }
}
var addf1 = curry(add);
console.log(addf1(1)(2)(4)(3));

function timer(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(num);
      resolve();
    }, 1000);
  })
}

// Promise.resolve().then(() => {
//   return timer(1);
// }).then(() => {
//   return timer(2);
// }).then(() => {
//   return timer(3);
// });

// [1, 2, 3].reduce((pre, cur) => {
//   return pre.then(() => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(cur);
//         resolve();
//       }, 1000);
//     });
//   });
// }, Promise.resolve());



var time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
}
var ajax1 = () => time(2000).then(() => {
  console.log(1);
  return 1;
})
var ajax2 = () => time(1000).then(() => {
  console.log(2);
  return 2;
})
var ajax3 = () => time(1000).then(() => {
  console.log(3);
  return 3;
})

function mergePromise (promiseArray) {
  // 在这里写代码
  let p = Promise.resolve();
  let results = [];
  promiseArray.forEach((item) => {
    p = p.then(item).then((val) => {
      results.push(val);
      return results;
    });
  });
  return p;
}

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

// 手写Promise简易版
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {

  constructor(executor) {
    this.reason;
    this.value;
    this.status = 'pending';
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        this.onFulfilledCallback.forEach((fn) => {
          fn(this.value);
        });
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECT;
        this.reason = reason;

        this.onRejectedCallback.forEach((fn) => {
          fn(this.reason);
        });
      }
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }

    if (this.status === PENDING) {
      this.onFulfilledCallback.push(onFulfilled);
      this.onRejectedCallback.push(onRejected);
    }
  }
}

new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 100);
}).then((data) => {
  console.log(data)
});

// 封装一个异步加载图片的方法
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      console.log('一张图片加载完成');
      resolve()
    };
    img.onerror = reject;
    img.src = url;
  });
}


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

/**
 *
 * @param {Array} urls
 * @param {Function} handler
 * @param {Number} limit
 * @return {Promise}
 */
function limitLoad(urls, handler, limit) {
  // 直接操作url,获取最先执行的固定元素数量
  const concurrentCount = urls.splice(0, limit);
  // 并发执行并获取执行的位置index
  const promises = concurrentCount.map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });

  return urls.reduce((first, cur) => {
    return first.then(() => {
      return Promise.race(promises);
    }).then((index) => {
      // 取得最先完毕的index值
      // 替换已执行完毕的promise
      promises[index] = handler(cur).then(() => index);
    }).catch((err) => {
      throw new Error(err);
    });
  }, Promise.resolve()).then(() => {
    return Promise.all(promises);
  });
}

limitLoad(urls, loadImage, 3).then(() => {
  console.log('所有图片加载完成');
}).catch(err => {
  console.error(err);
});

var obj4 = Object.create(null, {
  'a': {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 1
  },
  [Symbol()]: {
    value: 1
  }
});

// 查找right的prototype是否在left的[[prototype]]上
function instanceOf(left, right) {
  let l = left.__proto__;
  let r = right.prototype;
  while (l) {
    if (r === l) {
      return true;
    }
    l = l.__proto__;
  }
  return false;
}

console.log([] instanceof Array);
console.log([] instanceof Object);

console.log(instanceOf([], Array));
console.log(instanceOf([], Object));

class A{};

var a = new A();
console.log(instanceOf(a, A));
console.log(instanceOf(a, Array));

function parse(a, ...params) {
  return [...a, ...params];
}

console.log(parse([1, 2], 'abc'));


var sortArray = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
// 冒泡排序: 升续: 相邻两两比较，pre > next, 交换元素，直到末尾，得到最大数。
// 事件复杂度: O(n^2)， 稳定排序
function bubbleSort(array) {
  let len = array.length;
  // 外层控制循环次数
  // for (let i = 0; i < len; i++) { // O(n)
  //   // 内层控制交换规则
  //   for (let j = 0; j < len - i ; j++) { // O(n)
  //     if (array[j] > array[j + 1]) {
  //       [array[j], array[j + 1]] = [array[j + 1], array[j]];
  //     }
  //   }
  // }

  // // 1
  // for (let i = 0; i < len; i++) {
  //   for (let j = 0; j < len - i; j++) {
  //     if (array[j] > array[j + 1]) {
  //       [array[j], array[j + 1]] = [array[j + 1], array[j]];
  //     }
  //   }
  // }

  // // 优化一下
  // while (len > 0) {
  //   for (let i = 0; i < len - 1; i++) {
  //     if (array[i] > array[i + 1]) {
  //       [array[i], array[i + 1]] = [array[i + 1], array[i]];
  //     }
  //   }
  //   len--;
  // }

  // 优化两下
  // while (len > 0) {
  //   for (let i = 0; i < len - 1; i++) {
  //     if (array[i] > array[i + 1]) {
  //       [array[i], array[i + 1]] = [array[i + 1], array[i]];
  //     }
  //   }
  //   len--;
  // }

  // while (len > 0) {
  //   for (let i = 0; i < len - 1; i++) {
  //     if (array[i] > array[i + 1]) {
  //       [array[i], array[i + 1]] = [array[i + 1], array[i]];
  //     }
  //   }
  //   len--;
  // }

  while (len > 0) {
    for (let j = 0; j < len - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
      }
    }
    len--;
  }
  return array;
}
console.log(bubbleSort(sortArray));

// 选择排序: 取循环时的较小(较大值)为基准，直到遇到下一个较小(较大值)，再次交换位置，继续比较，根据条件依次交换
// 时间复杂度: O(n^2), 不稳定排序
function selectSort(array) {
  const len = array.length;
  // 控制外层循环次数， 并获知外层循环的当前值
  for (let i = 0; i < len; i++) {
    // 内层循环从下一个开始，比较 i - 1个数字与 arr[i]的大小
    for (let j = i + 1; j < len; j++) {
      // 比外层循环的值小(升续)，交换元素位置
      if (array[i] > array[j]) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }

  // for (let i = 0; i < len; i++) {
  //   for (let j = i + 1; j < len; j++) {
  //     if (array[i] > array[j]) {
  //       [array[i], array[j]] = [array[j], array[i]];
  //     }
  //   }
  // }

  // for (let i = 0; i < len; i++) {
  //   for (let j = i + 1; j < len; j++) {
  //     if (array[i] > array[j]) {
  //       [array[i], array[j]] = [array[j], array[i]];
  //     }
  //   }
  // }

  // for (let i = 0; i < len; i++) {
  //   for (let j = i + 1; j < len; j++) {
  //     if (array[i] > array[j]) {
  //       [array[i], array[j]] = [array[j], array[i]];
  //     }
  //   }
  // }

  // for (let i = 0; i < len; i++) {
  //   for (let j = i + 1; j < len; j++) {
  //     if (arr[i] > array[j]) {
  //       [array[i], array[j]] = [array[j], array[i]];
  //     }
  //   }
  // }

  // for (let i = 0; i< len; i++) {
  //   // 第一次循环得到最小的
  //   // 第二次循环得到第二位
  //   for (let j = i + 1; j < len; j++) {
  //     if (array[i] > array[j]) {
  //       [array[i], array[j]] = [array[j], array[i]];
  //     }
  //   }
  // }
  return array;
}
console.log(selectSort(sortArray));

// 直接插入排序: 从第二个元素开始，在已排序序列中从后向前扫描，找到相应位置并插入，
// 需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间
// 时间复杂度: O(n^2), 稳定排序
function insertSort(array) {
  const len = array.length;
  // 外层循环控制次数
  // for (let i = 1; i < len; i++) {
  //   let loopNumber = array[i];
  //   let j = i - 1;
  //   // 当j >= 0并且已排序数列中array[j]的值大于基准值(array[i]), 交换元素
  //   while (j >= 0 && array[j] > loopNumber) {
  //     array[j + 1] = array[j];
  //     j--;
  //   }
  //   // 基准值(array[i])移动到不符合while条件的位置
  //   array[j + 1] = loopNumber;
  // }


  // for (let i = 1; i < len; i++) {
  //   const loopNumber = array[i];
  //   let j = i - 1;
  //   while (j >= 0 && array[j] > loopNumber) {
  //     array[j + 1] = array[j];
  //     j--;
  //   }
  //   array[j + 1] = loopNumber;
  // }

  // 完全理解
  // for (let i = 1; i < len; i++) {
  //   const loopNumber = array[i];
  //   // 内层循环在已经排好序的i - 1长度上
  //   let j = i - 1;
  //   while (j >= 0 && array[j] > loopNumber) {
  //     array[j + 1] = array[j];
  //     j--;
  //   }
  //   array[j + 1] = loopNumber;
  // }

  // for (let i = 1; i < len; i++) {
  //   const loopNumber = array[i];
  //   let j = i - 1;
  //   while (j >= 0 && array[j] > loopNumber) {
  //     array[j + 1] = array[j];
  //     j--;
  //   }
  //   array[j + 1] = loopNumber;
  // }

  for (let i = 1; i < len; i++) {
    const loopNumber = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > loopNumber) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = loopNumber;
  }
  return array;
}
console.log(insertSort(sortArray));

// 快速排序





