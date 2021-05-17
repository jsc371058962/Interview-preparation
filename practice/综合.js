// function currying(fn, ...args) {
//   const length = fn.length;
//   return function (...rest) {
//     args = [...args, ...rest];
//     return args.length < length ? currying(fn, ...args) : fn.call(null, ...args);
//   }
// }

// function currying(fn, ...args) {
//   const length = fn.length;
//   return function (...rest) {
//     args = [...args, ...rest];
//     return length > args.length
//       ? currying(fn, ...args)
//       : fn.call(null, ...args);
//   };
// }

function currying(fn, ...args) {
  const length = fn.length;
  return function f(...rest) {
    rest = [...args, ...rest];
    return length > rest.length ? currying(fn, ...rest) : fn.apply(null, rest);
  }
}

// function currying(fn, ...args) {
//   const length = fn.length;
//   return function (...rest) {
//     rest = [...args, ...rest];
//     return rest.length < length ? currying(fn, ...rest) : fn.apply(null, rest);
//   }
// }
// function currying(fn, ...args) {
//   const length = fn.length;
//   return function (...rest) {
//     rest = [...args, ...rest];
//     return length > rest.length ? currying(fn, ...rest) : fn.apply(null, rest);
//   };
// }
function currying(fn, ...args) {
  const length = fn.length;
  return function (...rest) {
    rest = [...args, ...rest];
    return length < rest.length ? currying(fn, ...rest) : fn.apply(null, rest);
  }
}

function sum(a, b, c, d) {
  return a + b + c + d;
}
var add = currying(sum);
// console.log(add(1, 2)(3)(4));


function fn1(a) {
  console.log('fn1: ', a);
  return a + 1;
}

function fn2(a) {
  console.log('fn2: ', a);
  return a + 1;
}

function fn3(a) {
  console.log('fn3: ', a);
  return a + 1;
}

function fn4(a) {
  console.log('fn4: ', a);
  return a + 1;
}

// function compose(...fns) {
//   return function (...args) {
//     const firstFn = fns.shift();
//     return fns.reduce((pre, cur) => {
//       return cur(pre);
//     }, firstFn(...args));
//   }
// }
// function compose(...fns) {
//   return function (...args) {
//     const firstFn = fns.shift();
//     return fns.reduce((pre, cur) => {
//       return cur(pre);
//     }, firstFn(...args));
//   }
// }
// function compose(...fns) {
//   return function (...rest) {
//     const lastFn = fns.pop();
//     return fns.reduceRight((pre, cur) => {
//       return cur(pre);
//     }, lastFn(...rest));
//   }
// }

function compose(...fns) {
  return function (...rest) {
    const lastFn = fns.pop();
    return fns.reduceRight((prev, cur) => {
      return cur(prev);
    }, lastFn(...rest));
  }
}

console.log(compose(fn1, fn2, fn3, fn4)(1));


// 大数相加
function addBigNumber(a, b) {
  // 获取最长字符，使用padStart使两个长度相等
  const length = Math.max(a.length, b.length);
  a = a.padStart(length, '0');
  b = b.padStart(length, '0');

  // 算总字符串
  let sum = '';
  // 进位
  let f = 0;
  // 精确位上的数字
  let t = 0;
  for (let i = length - 1; i >= 0; i--) {
    t = Number(a[i]) + Number(b[i]) + f;
    f = Math.floor(t / 10);
    // 决定字串的顺序
    sum = t % 10 + sum;
  }
  if (f === 1) {
    sum = '1' + sum;
  }

  return sum;
}
console.log(addBigNumber('7827598742389574938257934', '9'));
console.log(
  addBigNumber('7827598742389574938257934', '7827598742389574938257934')
);

new Promise((resolve, reject) => {
  Promise.resolve().then(() => {
    resolve(1);
    Promise.resolve().then(() => { console.log(2) })
  })
}).then((value) => { console.log(value) });
console.log(3);



var abc = {
  '2': 'a',
  '3': 'b',
  length: 2,
  push: Array.prototype.push
}

// generator自执行函数
// 基于Thunk函数
/**
 *
 * @param {Generator} gen
 */
function run(gen) {
  let it = gen();

  function next(err, data) {
    let result = it.next(data);
    if (result.done) {
      return result;
    }
    result.value.then(function (data) {
      next(data);
    });
  }

  next();
}

function* gen() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
}

run(gen);

Promise.myAll = function (promises) {
  let ret = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      Promise.resolve(item).then(
        (data) => {
          ret[index] = data;
          count++;
          if (count === promises.length) {
            resolve(ret);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};

var p1 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 500);
  });
}
var p2 = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
}
var p3 = 3;
Promise.myAll([p1(), p2(), p3]).then((data) => {
  console.log(data);
});



Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      item.then((data) => {
        resolve(data);
      },
        (err) => {
          reject(err);
        });
    })
  });
}

Promise.myRace([
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 3000);
  }),
  Promise.reject(2),
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 2000);
  }),
]).then((data) => {
  console.log(data);
});

Promise.prototype.myFinally = function (callback) {
  return this.then(
    (data) => {
      callback();
      return data;
    },
    (err) => {
      callback();
      throw new Error(err);
    }
  );
};

Promise.prototype.myFinally1 = function (callback) {
  const p = this.constructor;
  return this.then(
    (data) => {
      p.resolve(callback()).then(() => data);
    },
    (err) => {
      p.resolve(callback()).then(() => {
        throw new Error(err);
      });
    }
  );
};

Promise.prototype.myDone = function () {
  this.catch((err) => {
    setTimeout(() => {
      throw new Error(err);
    }, 0);
  });
}

function factorial(n, total = 1) {
  if (n <= 1) return total;
  return factorial(n - 1, n * total);
}
console.log(factorial(10));

function fibna(n, p1 = 1, p2 = 1) {
  if (n <= 1) return p2;
  return fibna(n - 1, p2, p1 + p2);
}

function dp(n) {
  const arr = new Array(n);
  arr[0] = 1;
  arr[1] = 2;
  for (let i = 2; i < arr.length; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n - 1];
}

//蹦床函数
function trampoline(f) {
  while (f && typeof f === 'function') {
    f = f();
  }
  return f;
}
function sum(x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}
trampoline(sum(1, 100000));

sum(1).sumOf()
sum(1)(2)(3).sumOf();
sum(1, 2, 3).sumOf();
sum(1, 2)(3, 4).sumOf();

// 数都计算出来之后使用sumOf导出来
function sum(...args) {
  let s = add(...args);

  function add(...args) {
    return args.reduce((pre, cur) => {
      return pre + cur;
    }, 0);
  }

  function func(...args) {
    s += add(...args);
    return func;
  }

  func.sumOf = function () {
    return s;
  }

  return func;
}

sum(1)(2)(3).sumOf();
sum(1).sumOf();


// 手写promise
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(execute) {
    this.status = 'pending';
    this.data = '';
    this.reason = '';
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    const resolve = (data) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.data = data;
        this.onFulfilledCallback.forEach((f) => {
          f(this.data);
        });
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallback.forEach((f) => {
          f(this.reason);
        });
      }
    }

    execute(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.data);
    }
    if (this.status === REJECTED) {
      onRejected(this.reson);
    }
    if (this.status === PENDING) {
      this.onFulfilledCallback.push(onFulfilled);
      this.onRejectedCallback.push(onrejected);
    }
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 500);
}).then((data) => {
  console.log(data);
});

MyPromise.all = function (promises) {
  let dataArr = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((fn, index) => {
      Promise.resolve(fn).then((data) => {
        dataArr[index] = data;
        if (count === promises.length - 1) {
          resolve(dataArr);
        }
        i++;
      }, (err) => {
        reject(err);
      });
    });
  });
}

Function.prototype.myCall = function (o) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function');
  }
  let symbol = Symbol('call');
  const ctx = o ?? window;
  const args = [...arguments].slice(1);
  ctx[symbol] = this;
  let result = ctx[symbol](...args);
  delete ctx[symbol];
  return result;
}

Function.prototype.myApply = function (o) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function');
  }
  const symbol = symbol('apply');
  const ctx = o ?? window;
  const [args] = [...arguments].slice(1);
  const result = ctx[symbol](...args);
  delete ctx[symbol];
  return result;
}
Function.prototype.myBind = function (o, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function');
  }
  const symbol = Symbol('bind');
  const ctx = o ?? window;
  return (...rest) => {
    ctx[symbol] = this;
    const result = ctx[symbol](...args, ...rest);
    delete ctx[symbol];
    return result;
  }
}
function sum() {
  return this.a + this.b;
}
var obj = {
  a: 1,
  b: 2
}
sum.myCall(obj);

// settimeout节流
function throttle(fn, timeout) {
  let timer = null;
  return function (...rest) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.call(this, ...rest);
      clearTimeout(timer);
    }, timeout);
  }
}

function throttle1(fn, timeout) {
  let prevTime = +new Date();
  return (...args) => {
    const nowDate = +new Date();
    if (nowDate - prevTime > timeout) {
      fn.call(null, ...args);
      prevTime = nowDate;
    }
  }
}

function debounce(fn, timeout, immediate = false) {
  // let timer = null;
  // return function (...args) {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  //   timer = setTimeout(() => {
  //     fn.call(this, ...args);
  //   }, timeout);
  // }
  let timer = null;
  return function (...rest) {
    if (timer) clearTimeout(timer);

    if (immediate) {
      const isCallNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
      if (isCallNow) fn.call(this, ...rest);
    } else {
      timer = setTimeout(() => {
        fn.call(this, ...rest);
      }, timeout);
    }
  }
}


// instanceof原理: 查找构造函数的原型是否存在于目标对象的原型链上
function instanceof1(left, right) {
  let l = Object.getPrototypeOf(left);
  const r = right.prototype;
  while (l) {
    if (l === r) {
      return true;
    }
    l = Object.getPrototypeOf(l);
  }
  return false;
}

var arr = [];
instanceof1([], String);

// 手写Object.create(): 将o放到某一个对象的__proto__
Object.create1 = function (o, properties = {}) {
  // let obj = {};
  // Object.setPrototypeOf(obj, o);
  // Object.defineProperties(obj, properties);
  // return obj;
  function Fn() { };
  Fn.prototype = o;
  return new Fn();
}

function currying(fn, ...args) {
  const len = fn.length;
  return function (...rest) {
    rest = [...args, ...rest];
    if (len > rest.length) {
      return currying(fn, ...rest);
    } else {
      return fn.call(null, ...rest);
    }
  }
}

function sum(a, b, c, d) {
  return a + b + c + d;
}

currying(sum)(1)(2)(3)(4);


// 不定参数的一种方式
function compute(arr) {
  return arr.reduce((prev, cur) => {
    return prev + cur;
  });
}
function sum(...args) {
  let total = compute(args);

  function fn(...rest) {
    total += compute(rest);
    return fn;
  }

  fn.sumOf = function () {
    return total;
  }
  return fn;
}
sum(1, 2, 3)(4).sumOf()

// 不定参数的另一种方式
// sum1(1, 2, 4)()/sum1(1)(2)()
function sum1(...args) {
  return function (...rest) {
    if (!rest.length) {
      return compute([...args, ...rest]);
    } else {
      return sum1.call(null, ...args, ...rest);
    }
  }
}

function handler(msg) {
  console.log(msg)
}
function handler1(msg) {
  console.log(msg)
}
const customEvent = {
  // 一个对象存储事件类型和handler
  event: {},
  // 添加事件函数和type
  addListener(type, handler) {
    const handlerSet = this.event[type];
    if (!handlerSet) {
      handlerSet = new Set();
    }
    handlerSet.add(handler);
  },
  fireEvent(type, message) {
    const handlerSet = this.event[type];
    if (handlerSet && handlerSet.size) {
      handlerSet.forEach((fn) => {
        fn(message);
      });
    }
  },
  removeListener(type, handler) {
    const handlerSet = this.event[type];
    if (handlerSet && handlerSet.size) {
      for (const fn of handlerSet.values()) {
        if (fn === handler) {
          handlerSet.delete(fn);
          break;
        }
      }
    }
  }
}

customEvent.addListener('msg', handler);
customEvent.addListener('msg', handler1);
customEvent.fireEvent('msg', { 'name': 'jin' });
customEvent.removeListener('msg', handler);


class EventBus {
  constructor() {
    this.eventSet = {};
  }

  addListener(type, handler) {
    if (!this.eventSet[type]) {
      this.eventSet[type] = new Set();
    }
    this.eventSet[type].add(handler);
  }

  fireEvent(type, message) {
    let handlerArr = this.eventSet[type];
    if (handlerArr && handlerArr.size) {
      handlerArr.forEach((fn) => {
        fn(message);
      });
    }
  }

  removeListener(type, handler) {
    let handlerArr = this.eventSet[type];
    if (handlerArr && handlerArr.size) {
      for (const fn of handlerArr.values()) {
        if (fn === handler) {
          handlerArr.delete(fn);
          break;
        }
      }
    }
  }
}
var eventBus = new EventBus();
eventBus.addListener('msg', handler);
eventBus.addListener('msg', handler1);
eventBus.fireEvent('msg', { 'name': 'jin' });
eventBus.removeListener('msg', handler);


// 简易双向绑定
var input = document.getElementById('input');
var obj = {}
Object.defineProperty(obj, 'name', {
  enumerable: true,
  configurable: true,
  set(val) {
    // this.value = val;
    input.value = val;
  },
  get() {
    // return this.value;
    console.log('get');
  }
});

document.addEventListener('click', function (evt) {
  obj.name = evt.target.value;
});


// 使用 reduce 方法实现 forEach、map、filter
// forEach执行回到函数即可，没有返回值
// 但是这第一个参数确实没法处理了，只能放在这不使用
Array.prototype.myForEach = function (callback) {
  return this.reduce((prev, cur, index) => {
    callback(cur, index);
  }, 0);
}
Array.prototype.myMap = function (callback) {
  return this.reduce((prev, cur, index) => {
    return prev.concat(callback(cur, index));
  }, []);
}
Array.prototype.myFilter = function (callback) {
  return this.reduce((prev, cur, index) => {
    return prev.concat(callback(cur, index) ? callback(cur, index) : []);
  }, []);
}
var a = []
var b = [1, 2, 3];
b.myFilter((value, index) => {
  return value > 2 ? value : false;
});
b.myMap((value, index) => {
  return value * 2;
});
b.myForEach(function (value, index) {
  a.push(value);
});

// 实现indexOf方法
// 实现谁的indexOf方法？Array? String?
// 通用的先试一下
function myIndexOf(o, s) {
  const toStringTag = Object.prototype.toString;
  if (
    toStringTag.call(o) !== '[object Array]' &&
    toStringTag.call(o) !== '[object String]'
  ) {
    throw new TypeError('o is invalid!');
  }
  let temp = [...o];
  for (let i = 0; i < temp.length; i++) {
    if (s === temp[i]) {
      return i;
    }
  }
  return -1;
}
myIndexOf('abcd', 'c');
myIndexOf([1, 3, 6, 4], 4);


// 设计一个简单的任务队列，要求分别在 1,3,4 秒后打印出 "1", "2", "3"
// Promise实现
function timeouter(value, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(value);
      resolve();
    }, time);
  });
}
Promise.resolve().then(() => {
  return timeouter('1', 1000);
}).then(() => {
  return timeouter('2', 3000);
}).then(() => {
  return timeouter('3', 4000);
});

//JavaScript 实现如下语法的功能 var a=(5).plus(3).minus(6);
Number.prototype.plus = function (num) {
  return this + num;
}
Number.prototype.minus = function (num) {
  return this - num;
}
var a = (5).plus(3).minus(6);

// 打印fibonacci数
function fibonacci(n) {
  if (n < 0) return false;
  if (n === 0) return [0];
  let arr = [];
  arr = [0, 1];
  for (let i = 1; i < n; i++) {
    arr.push(arr[i - 1] + arr[i]);
  }
  return arr;
}
fibonacci(5);

// 加载一个图片，并设置高度50，宽度50
function loadImage(url) {
  let image = new Image();
  image.onload = function () {
    image.src = url;
    image.width = 50;
    image.height = 50;
  }
}


// 数组实现栈
// LIFO
class Stack {
  constructor() {
    this.arr = new Array();
  }
  push(item) {
    this.arr.push(item);
  }
  pop() {
    return this.arr.pop();
  }
  getTop() {
    return this.arr[this.arr.length - 1];
  }
  empty() {
    return this.arr.length === 0;
  }
  clear() {
    this.arr.length = 0;
  }
}

// 两个栈实现一个队列
// 至少支持push功能和pop功能
// 队列：FIFO 栈：LIFO
class Queue {
  // 队列先进先出的
  constructor() {
    this.iStack = new Stack();
    this.rStack = new Stack();
  }
  pop() {
    if (!this.rStack.empty()) {
      return this.rStack.pop();
    }

    while (!this.iStack.empty()) {
      const i = this.iStack.pop();
      this.rStack.push(i);
    }
    return this.rStack.pop();
  }
  push(item) {
    this.iStack.push(item);
  }
}

var queue = new Queue();
queue.push(123);
queue.push(234);
queue.pop()


// 0-59依次循环
function timer() {
  var i = 0;
  setInterval(() => {
    console.log(i++);
    if (i === 60) {
      i = 0;
    }
  }, 1000);
}

/**
 * 页面上有三个按钮，分别为 A、B、C，点击各个按钮都会发送异步请求且互不影响，
 * 每次请求回来的数据都为按钮的名字。
 * 请实现当用户依次点击 A、B、C、A、C、B 的时候，最终获取的数据为 ABCACB。
*/
function handlerClick(tag, timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tag);
    }, 500 * timeout);
  });
}
var p = Promise.resolve();
function queue(tag) {
  p = p.then(() => {
    return handlerClick(tag, Math.floor(Math.random() * 2) + 1);
  });
  return p;
}
async function getResult(tag) {
  const result = await queue(tag);
  console.log(result);
}
getResult('A');
getResult('B');
getResult('C');
getResult('A');
getResult('C');
getResult('B');

// history
// popstage事件， 在调用back(), go(), forward()时会触发
// hashchange事件, 1. location.hash = 'edit';
// 2. pushState({}, title, url); replaceState({}, title, url), back(), go(), forward()会触发


// 观察者模式
class Subject {
  /**
   * 1. 1个数组用于收集观察者
   * 2. 收集观察者函数
   * 3. 发布通知
   * 4. 删除观察者
   */

  constructor() {
    this.observers = [];
  }
  add(item) {
    this.observers.push(item);
  }
  remove(item) {
    if (this.observers.includes(item)) {
      const index = this.observers.findIndex((value) => value === item);
      this.observers.splice(index, 1);
    }
  }
  notify() {
    this.observers.forEach((instance) => {
      instance.update();
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(`this name is ${this.name}.`);
  }
}
const subject = new Subject();
const observer1 = new Observer('xiaoming');
const observer2 = new Observer('xiaohong');
subject.add(observer1);
subject.add(observer2);
subject.notify();


// rgb转换为大写16进制
function rgb2Hex(str) {
  let rgbArr = str.match(/\d+/g);
  const hex = (val) => {
    return Number(val).toString(16).padStart(2, '0');
  };
  return rgbArr.reduce((prev, cur) => {
    return prev + hex(cur);
  }, '#').toUpperCase();
}

// 递归实现1-100的累加和
function sum100(n, total = 0) {
  // 终止条件
  if (n === 0) return total;
  return sum100(n - 1, total + n);
}

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // 应该是一个具有iterator对象的数据，简易处理使用Array
    if (!(promises instanceof Array)) {
      reject(new TypeError('Not an iterable object!'));
    }

    const dataArr = [];
    let count = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (data) => {
          dataArr[index] = data;
          if (count === promises.length - 1) {
            resolve(dataArr);
          }
          count++;
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

var a = {
  [Symbol.toPrimitive]() {
    return 2;
  },
  valueOf() {
    return 3;
  },
  toString() {
    return '123';
  }
};

var i = 1;
var a = {
  valueOf() {
    return i++;
  }
}
a == 1 && a == 2;

function flatArray(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatArray(cur) : cur);
  }, []);
}
flatArray([1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]);

function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    const loopNumber = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > loopNumber) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = loopNumber;
  }
  return arr;
}

var quickSort = function (array, left, right) {

};
quickSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48], 0, 15);

// 模拟new
function createNew(Fn, ...args) {
  if (typeof Fn !== 'function') {
    throw new TypeError('Not a valid function!');
  }
  const o = new Object();
  Object.setPrototypeOf(o, Fn.prototype);
  const result = Fn.call(o, ...args);
  return typeof result === 'object' ? result : o;
}

Function.prototype.bind = function (o, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function!');
  }
  const context = o ?? window;
  const symbol = Symbol('bind');
  return (...rest) => {
    context[symbol] = this;
    const result = context[symbol](...args, ...rest);
    delete context[symbol];
    return result;
  }
}

Function.prototype.bind1 = function (context, ...args) {
  // 异常处理
  if (typeof this !== 'function') {
    throw new Error('Not a function!');
  }
  // 保存this的值，它代表调用 bind 的函数
  // 可以是普通函数的调用也有可能是构造函数

  // 保存this, 这是一个function
  const selfFn = this;
  const F = function (...rest) {
    return selfFn.apply(this instanceof F ? this : context ?? window, [
      ...args,
      ...rest,
    ]);
  };
  if (this.prototype) {
    F.prototype = this.prototype;
  }
  return F;
};

Function.prototype.call = function (o, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function!');
  }
  const context = o ?? window;
  const symbol = Symbol('call');
  context[symbol] = this;
  const result = context[symbol](...args);
  delete context[symbol];
  return result;
}

Function.prototype.apply = function (o, args) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function!');
  }
  const context = o ?? window;
  const symbol = Symbol('apply');
  context[symbol] = this;
  const result = context[symbol](...args);
  delete context[symbol];
  return result;
}

// 深拷贝，可解决循环引用问题
function deepClone(obj, map = new WeakMap()) {
  if (obj == null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== 'object') return obj;
  if (map.has(obj)) return obj;

  map.set(obj, true);
  const o = Array.isArray(obj) ? [] : {};
  for (const key of Reflect.ownKeys(obj)) {
    o[key] = typeof obj[key] === 'object' ? deepClone(obj[key], map) : obj[key];
  }
  return o;
}

function string2Binary(str) {
  let binStr = '';
  for (const i of str) {
    // 获取unicode码之后转换2二进制
    let i2b = i.codePointAt().toString(2).padStart(8, '0');
    binStr += i2b;
  }
  return binStr;
}

new Promise((resolve, reject) => {
  console.log('外部promise');
  resolve();
})
  .then(() => {
    console.log('外部第一个then');
    new Promise((resolve, reject) => {
      console.log('内部promise');
      resolve();
    })
      .then(() => {
        console.log('内部第一个then');
      })
      .then(() => {
        console.log('内部第二个then');
      });
    return new Promise((resolve, reject) => {
      console.log('内部promise2');
      resolve();
    })
      .then(() => {
        console.log('内部第一个then2');
      })
      .then(() => {
        console.log('内部第二个then2');
      });
  })
  .then(() => {
    console.log('外部第二个then');
  });

function currying(fn, ...args) {
  let len = fn.length;
  return function(...rest) {
    rest = [...args, ...rest];
    if (len > rest.length) {
      return currying(fn, ...rest);
    } else {
      return fn.apply(null, rest);
    }
  }
}

// sort和reserve是返回原数组的引用
// -/*/\//%在计算时能转数字的才转换数字，不然就是NaN
// https://www.cnblogs.com/zhenjianyu/p/12965561.html, 关于cdn讲挺好。


function getTotal() {
  return [...arguments].reduce((prev, cur) => {
    return prev + cur;
  }, 0);
}
function sum1(fn) {
  let args = Array.prototype.slice(arguments, 1);
  function getArr(...rest) {
    rest = [...rest, ...args];
    return sum1.call(null, fn, ...rest);
  }

  getArr.toString = function () {
    return fn.call(null, ...args);
  }

  return getArr;
}

var sum = sum1(getTotal);
sum(1)(2);
sum(1, 2, 3);

// 累加函数sum(1, 2, 3)(2).sumOf()
function sum(...args) {
  let total = getSum(...args);
  function getSum() {
    return [...arguments].reduce((prev, cur) => {
      return prev + cur;
    }, 0);
  }
  function curried(...rest) {
    total += getSum(...rest);
    return curried;
  }
  curried.sumOf = function () {
    return total;
  }
  return curried;
}

// add(1)(2, 3, 4)(5)
function add(...args) {
  let total = getSum(...args);
  function getSum() {
    return [...arguments].reduce((prev, cur) => {
      return prev + cur;
    }, 0);
  }
  function fn(...rest) {
    total += getSum(...rest);
    return fn;
  }
  fn.toString = function () {
    return total;
  }

  return fn;
}

// 迭代求斐波那契
function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  let p1 = 0, p2 = 1;
  for (let i = 2; i < n; i++) {
    [p1, p2] = [p2, p1 + p2];
  }
  return p2;
}

// 实现立即执行的防抖
function debounce(fn, timeout, immediate = false) {
  let timer = null;
  return function (...rest) {
    timer && clearTimeout(timer);
    if (immediate) {
      let isCallNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
      if (isCallNow) fn.call(null, ...rest);
    } else {
      timer = setTimeout(() => {
        fn.call(null, ...rest);
      }, timeout);
    }
  }
}

// LRUCache简单实现
class LRUCache {
  constructor(limit) {
    this.map = new Map();
    this.limit = limit;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.limit) {
      // 删除第一个值
      this.map.delete(this.map.keys().next().value);
    }
    this.map.set(key, value);
  }

  get(key) {
    if (this.map.has(key)) {
      const value = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, value);
      return value;
    }
    return -1;
  }

  clear() {
    this.map.clear();
  }
}
var cache = new LRUCache(5);
cache.put(1, '1');
cache.put(2, '2');
cache.put(3, '3');
cache.put(4, '4');
cache.put(5, '5');
cache.get(2);

// 冒泡排序
function bubbleSort(array) {
  array = [...array];
  // for (let i = 0; i < array.length; i++) {
  //   for (let j = 0; j < array.length - i; j++) {
  //     if (array[j] > array[j + 1]) {
  //       [array[j], array[j + 1]] = [array[j + 1], array[j]];
  //     }
  //   }
  // }
  // 优化冒泡
  let i = array.length;
  while (i) {
    for (let j = 0; j < i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
    i--;
  }
  return array;
}

// 选择排序
function selectSort(array) {
  array = [...array];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const elementi = array[i];
      const elementj = array[j];
      if (elementi > elementj) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  return array;
}

// 直接插入排序
function insertSort(array) {
  array = [...array];
  for (let i = 1; i < array.length; i++) {
    let loopNumber = array[i];
    let j = i - 1;
    while (j >= 0 && loopNumber < array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = loopNumber;
  }
  return array;
}

// 所有的promise执行完，无论成功与否
Promise.myAllSettled = function (promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('Not a iterator object!');
  }
  let count = 0;
  const results = [];
  return new Promise((resolve, reject) => {
    promises.forEach((item, index) => {
      Promise.resolve(item).then((value) => {
        results[index] = { status: 'fulfilled', value };
        count++;
        if (count === promises.length) {
          resolve(results);
        }
      },
        (reason) => {
          results[index] = { status: 'rejected', reason };
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
Promise.myAllSettled([p1(), p2(), p3]).then((data) => {
  console.log(data);
});

// 精确settimeout时间，意思是到某个延时时间立即执行
// 采用系统时间补偿方式。
// 计算每次执行的理想时间和实际执行时间，算出diff时间，进行补偿机制
// 53(real) - 50(ideal) = 3; delay更新为50 - 3 = 47;
function timer(delay = 50) {
  let startTime = Date.now(),
    count = 1;

  function instance() {
    let idealTime = count * delay,
      realTime = Date.now() - startTime;

    count++;
    diff = realTime - idealTime;

    window.setTimeout(() => {
      console.log(idealTime, realTime, diff);
      instance();
    }, delay - diff);
  }

  window.setTimeout(() => {
    instance();
  }, delay);
}
timer();
var len = 100000;
while (len-- >= 0) { }


// 生成随机色值
`#${(~~(Math.random() * (1 << 24))).toString(16).padStart(6, '0')}`;

// ----------------------start---------------------
// 提供一个异步add函数，实现一个await sum(...args)函数
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}

function sumTow(res, cur) {
  return new Promise((resolve, reject) => {
    asyncAdd(res, cur, function (err, data) {
      if (!err) {
        resolve(data);
      }
    });
  });
}

function sum(...args) {
  return args
    .reduce((prev, cur) => {
      return prev.then((res) => {
        return sumTow(res, cur);
      });
    }, Promise.resolve(0))
    .then((data) => {
      return data;
    });
}

sum(1, 2, 3).then(console.log);
// ----------------------end---------------------

// ----------------------start---------------------
// 精确settimeout时间
function timer(delay = 50) {
  let startTime = Date.now(),
    count = 1;
  function instance() {
    let idealTime = count * delay;
    realTime = Date.now() - startTime;
    count++;
    const diff = realTime - idealTime;
    setTimeout(instance, delay - diff);
  }
  setTimeout(() => {
    instance();
  }, delay);
}
timer();
let len = 10000;
while (len-- > 0) { }
// ----------------------end---------------------

// ----------------------start-------------------
// 函数防抖
function debounce(fn, timeout = 50, immediate = false) {
  let timer = null;
  return function (...rest) {
    timer && clearTimeout(timer);
    if (immediate) {
      const isCallNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
      isCallNow && fn.call(null, ...rest);
    } else {
      timer = setTimeout(() => {
        fn.call(null, ...rest);
      }, timeout);
    }
  }
}
// 函数节流
// 1. 计时法
function throttle(fn, timeout = 50) {
  let startTime = Date.now();
  return function (...rest) {
    if (Date.now() - startTime >= timeout) {
      fn.call(null, ...rest);
      startTime = Date.now();
    }
  }
}
// 2. 定时器法
function _throttle(fn, timeout = 50) {
  let timer = null;
  return function (...rest) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.call(null, ...rest);
      clearTimeout(timer);
      timer = null;
    }, timeout);
  }
}
// ----------------------end---------------------

// ----------------------start-------------------
var data = [
  { userId: 8, title: 'title1' },
  { userId: 11, title: 'other' },
  { userId: 15, title: null },
  { userId: 19, title: 'title2' }
];

var result = find(data).where({ title: /\d+/ }).orderBy('userId', 'desc');

// 解析
function find(o) {
  function fn() { }
  fn.where = function (filterRule) {
    o = o.filter((item) => filterRule['title'].test(item.title));
    return fn;
  };
  fn.orderBy = function (userId, desc) {
    o = o.sort((a, b) => {
      return desc === 'desc' ? b[userId] - a[userId] : a[userId] - b[userId];
    });
    return o;
  };

  return fn;
}
// ----------------------end---------------------

// ----------------------start-------------------
// 对象的深度比较
function isEqual(o1, o2) {
  if (
    (typeof o1 !== 'object' && typeof o2 !== 'function') ||
    (typeof o1 !== 'function' && typeof o2 !== 'object')
  ) {
    return false;
  }
  if (typeof o1 === typeof o2) {
    return o1.toString() === o2.toString();
  }
  const o1Keys = Object.keys(o1);
  const o2Keys = Object.keys(o2);
  if (o1Keys.length !== o2Keys.length) {
    return false;
  }
  for (let i = 0; i < o1Keys.length; i++) {
    if (o2.hasOwnProperty(o1Keys[i])) {
      // 基本数据类型
      if (
        typeof o1[o1Keys[i]] !== 'object' &&
        typeof o1[o1Keys[i]] !== 'function'
      ) {
        if (o1[o1Keys[i]] !== o2[o1Keys[i]]) {
          return false;
        }
      } else {
        // 引用数据类型
        return isEqual(o1[o1Keys[i]], o2[o1Keys[i]]);
      }
    } else {
      return false;
    }
  }
}
var obj1 = {
  a: 1,
  b: 2,
  c: function () {
    console.log(1);
  }
}
var obj1 = {
  b: 2,
  c: function () {
    console.log(1);
  },
  a: 1
}
// ----------------------end---------------------

// ----------------------start-------------------
//是否存在循环引用
var obj = {
  a: 1,
  b: 2,
}
obj.c = obj;
isHasCircle(obj);
function isHasCircle(o, map = new WeakMap()) {
  if (map.has(o)) {
    return true;
  }
  const keys = Object.keys(o);
  if (!keys.length) return false;
  map.set(o, true);
  for (let i = 0; i < keys.length; i++) {
    const element = keys[i];
    if (typeof o[element] === 'object' && Object.keys(o[element]).length) {
      return isHasCircle(o[element], map);
    }
  }
  return false;
}
// ----------------------end---------------------

// ----------------------start-------------------
Object.myIs = function myIs(x, y) {
  // 0, -0的情况
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
// ----------------------end---------------------

// ----------------------start-------------------
// 时间切片
function timeSlice(gen) {
  if (typeof gen === 'function') gen = gen();
  if (!gen || typeof gen.next !== 'function') return;
  return function next() {
    // 协定一个切片阀值，切片代码执行超出时间则放入下次frame再执行
    const start = performance.now();
    let res = null;
    do {
      res = gen.next();
    } while (!res.done && performance.now() - start > 25);
    if (res.done) return;
    window.requestIdleCallback(next);
  };
}
timeSlice(function* gen() {
  // 协定一个终止条件
  const start = performance.now();
  while (performance.now() - start < 1000) {
    console.log(11111);
    yield;
  }
  console.log('终止done!!!');
})();
// ----------------------end---------------------

// ----------------------start-------------------
// 参数不等的柯理化
sum(1)(2)(3);
sum(1, 2, 3)(4);
function sum(...args) {
  function compute(...arr) {
    return arr.reduce((prev, cur) => {
      return prev + cur;
    });
  }
  let total = compute(...args);
  function fn(...rest) {
    total += compute(...rest);
    return fn;
  }
  fn.toString = function () {
    return total;
  }
  return fn;
}
// ----------------------end---------------------

// ----------------------start-------------------
function timeSlice(gen) {
  // 得到iterator对象
  if (typeof gen === 'function') gen = gen();
  if (!gen && typeof gen.next === 'function') throw new Error('error!');
  return function next() {
    const start = performance.now();
    let res;
    do {
      res = gen.next();
    } while (!res.done && (performance.now() - start < 25));

    if (res.done) return;
    window.requestIdleCallback(next);
  }
}
timeSlice(function gen() {
  const start = performance.now();
  // 设定终止条件
  while (performance.now() - start <= 10000) {
    console.log(111);
    yield;
  }
  console.log('done.');
})();
// ----------------------end---------------------

// ----------------------start-------------------
function timeSlice1(gen) {
  if (typeof gen === 'function') gen = gen();
  if (!gen || typeof gen.next !== 'function') throw new TypeError('ERROR!');
  let res = null;
  return function next() {
    const start = performance.now();
    do {
      res = gen.next();
    } while (!res.done && performance.now() - start < 25)
    if (res.done) return;
    window.requestIdleCallback(next);
  }
}
timeSlice1(function* gen() {
  // 设定终止条件
  const start = performance.now();
  while (performance.now - start <= 1000) {
    // doSomething();
    yield;
  }
})();
// ----------------------end---------------------

// ----------------------start-------------------
// 柯理化，new，原型
// 1. 返回一个方法
Function.prototype.myBind = function (o, ...args) {
  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }
  const ctx = o ?? window;
  const fToBind = this;
  function Fn(...rest) {
    return fToBind.apply(this instanceof Fn ? this : ctx, [...args, ...rest]);
  }
  Fn.prototype = this.prototype;
  return Fn;
}

Function.prototype.myBind1 = function (o, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function!');
  }
  const ctx = o ?? window;
  const fToBind = this;
  function fn(...rest) {
    return fToBind.apply(this instanceof fn ? this : ctx, [...args, ...rest]);
  }
  if (this.prototype) {
    fn.prototype = this.prototype;
  }
  return fn;
}
// ----------------------end---------------------

// ----------------------start-------------------
// 自记忆函数
// 原理很简单，利用闭包特性缓存已经计算过的数据,典型的空间换时间
function selfMemoStore(fn) {
  const cache = {};
  return function getCache(...args) {
    const k = JSON.stringify(args);
    if (cache[k]) return cache[k];
    return cache[k] = fn.apply(null, ...args);
  }
}
// ----------------------end---------------------

// ----------------------start-------------------
// 简易co模块
function co(gen) {
  const it = gen();
  let result = it.next();

  return new Promise((resolve, reject) => {
    function next(result) {
      if (result.done) resolve(result.value);
      result.value = Promise.resolve(result.value);
      result.value.then((res) => {
        result = it.next(res);
        next(result);
      }).catch((err) => {
        reject(err);
      });
    }
    next(result);
  });
}
// ----------------------end---------------------

// ----------------------start-------------------
function find(obj, str) {
  return str.split('.').reduce((prev, cur) => prev[cur], obj);
}
var o = {
  a: {
    b: {
      c: 1
    }
  }
}
// ----------------------end---------------------















