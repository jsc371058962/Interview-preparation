// 手撕方法

// new关键字
function createNew(fn, param) {
  //新建一个对象
  const o = new Object();
  // 关联到fn的原型链
  Object.setPrototypeOf(o, fn.prototype);
  // 执行方法，将参数赋值
  const result = fn.call(o, ...param);
  return typeof result === 'object' ? result : o;
}

function Person(name) {
  this.name = name;
}

var person = createNew(Person, 'jin');
console.log(person)
console.log(Object.getPrototypeOf(person))
console.log(person instanceof Person)

// 实现map方法
// map, 回调函数遍历数组进行操作，返回新的数组
Array.prototype.myMap = function (callback) {
  let arr = [];
  let length = this.length;
  for (let i = 0; i < length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    arr.push(callback(this[i], i, this));
  }
  return arr;
}
console.log([1, 2, 3].myMap((value) => value * 2));

// 实现filter方法
Array.prototype.myFilter = function (callback) {
  let arr = [];
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this) && arr.push(this[i]);
  }
  return arr;
}
console.log([1, 2, 3].myFilter((value) => value > 2));

// 实现some方法
// 一有符合条件的，便返回true
Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      return true;
    }
  }
  return false;
}
console.log([1, 2, 3].mySome((value) => value > 2)); // true

// 实现every方法
// 必须所有都符合条件，否则返回false
Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i])) {
      return false;
    }
  }
  return true;
}
console.log([1, 2, 3].myEvery((value) => value > 2)); // false
console.log([3, 5, 3].myEvery((value) => value > 2)); // true

// 实现find方法
// 找到符合条件的第一个元素
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      return this[i];
    }
  }
  return;
}
console.log([1, 2, 3].myFind((value) => value > 2)); // false
console.log([3, 5, 3].myFind((value) => value > 5));

// 实现findIndex方法
Array.prototype.myFindIndex = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      return i;
    }
  }
  return;
}
console.log([5, 2, 3].myFindIndex((value) => value > 2)); // false
console.log([3, 5, 3].myFindIndex((value) => value > 5));

// 实现forEach方法
// 循环执行某个方法就行
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
}
console.log([3, 5, 3].myForEach((value, index) => {
  console.log([value, index]);
}));

// 实现reduce方法
Array.prototype.myReduce = function (callback, prev) {
  for (let i = 0; i < this.length; i++) {
    if (typeof prev === 'undefined') {
      prev = callback(this[i], this[i + 1], i + 1, this);
      i++;
    } else {
      prev = callback(prev, this[i], i, this);
    }
  }
  return prev;
}

Array.prototype.myReduce1 = function (callback, prev) {
  for (let i = 0; i < this.length; i++) {
    // 只可能会执行一次
    if (typeof prev === 'undefined') {
      prev = callback(this[i], this[i + 1], i + 1, this);
      i++;
    } else {
      prev = callback(prev, this[i], i, this);
    }
  }
  return prev;
}
console.log([5, 2, 3].myReduce((pre, cur) => pre + cur, 100));

// 手写instanceof
function instanceOf(left, right) {
  let l = left.__proto__;
  let r = right.prototype
  while (l) {
    if (l === r) {
      return true;
    }
    l = l.__proto__;
  }
  return false;
}
class A {}
var a = new A();

console.log(instanceOf(a, A));
console.log(instanceOf(a, Array));
console.log(instanceOf(a, Object));

// 实现Object.create静态方法
// 将参数的设置为新对象的原型
Object.create = function (obj, properties = {}) {
  function Fn() {}
  var o = new Fn();
  Object.setPrototypeOf(o, obj);
  return o;
  // 2.
  // function Fn() {};
  // // 将Fn的原型指向传入的 obj
  // Fn.prototype = obj;
  // return new Fn();
  // 3.
  // var o = {};
  // Object.setPrototypeOf(o, obj);
  // Object.defineProperties(o, properties);
  // return o;
}

// 通用柯理化函数
function curry(fn, ...args) {
  // 获取实际函数的参数长度
  const length = fn.length;
  return function (...rest) {
    // 保存上次与本次的参数
    args = [...args, ...rest];
    // if (args.length < length) {
    //   // args长度小于fn参数长度的时候进行递归
    //   return curry(fn, ...args);
    // } else {
    //   return fn(...args);
    // }
    return args.length < length ? curry(fn, ...args) : fn.apply(null, args);
  };
}

function sum(a, b, c, d) {
  return a + b + c + d;
}
var add = curry(sum);
console.log(add(1, 2)(3)(4));

// 实现节流函数1
// 固定时间执行依次，不论点多少下
// 主要应用在频繁操作的情况下，例如onresize，onscroll
function throttle(fn, timeout = 500) {
  let prevTime = +new Date();
  return function (...rest) {
    if (+new Date() - prevTime > timeout) {
      fn.call(null, ...rest);
      prevTime = +new Date();
    }
  }
}

// 实现节流方法2
function throttle1(fn, timeout = 500) {
  let timer = null;
  return function (...rest) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.call(null, ...rest);
      timer = null;
    }, timeout);
  }
}

function logFn() {
  console.log(123);
}
var doThrottle = throttle(logFn);
var doThrottle1 = throttle1(logFn);

// 实现简单防抖
function debounce(fn, timeout = 500) {
  let timer = null;
  return function (...rest) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(null, ...rest);
    }, timeout);
  }
}
var doDebounce = debounce(logFn);

function sum1(a, b) {
  return a + b;
}

function toUpper(str) {
  return str.toUpperCase();
}

function add(str) {
  return '===' + str + '===';
}

function compose(...rest) {
  return function (...args) {
    let lastfn = rest.pop();
    return rest.reduceRight((pre, next) => {
      return next(pre);
    }, lastfn(...args));
  }
}
var comfn = compose(add, toUpper, sum1);
console.log(comfn('cherry', '27'));

// 手写字符串转二进制
function charToBinary(str) {
  let binCode,
    code = '';
  for (const s of str) {
    binCode = s.codePointAt().toString(2).padStart(8, '0');
    code += binCode;
  }
  return code;
}

// 数组去重
// 1. set值唯一性
function unique(arr) {
  return [...new Set(arr)];
}
console.log(unique([2, 4, 2, 5, 7, 4, 5, 9]));

// 2. 不存在的push到新的空数组
function unique1(arr) {
  const array = [];
  for (const item of arr) {
    if (!array.includes(item)) {
      array.push(item);
    }
  }
  return array;
}
console.log(unique1([2, 4, 2, 5, 7, 4, 5, 9]));

// 3. filter
function unique2(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
console.log(unique2([2, 4, 2, 5, 7, 4, 5, 9]));


// 数组交集
function intersection(a, b) {
  return a.filter((item) => [...new Set(b)].includes(item));
}
console.log(intersection([1, 2], [2, 2, 3]));

// 数据并集
function union(a, b) {
  return [...new Set([...new Set(a), ...new Set(b)])];
}

function union1(a, b) {
  return [...new Set(a)].concat(b.filter((item) => !a.includes(item)));
}

function union2(a, b) {
  return [...new Set(a.concat(b))];
}
console.log(union([1, 2], [2, 2, 3]));
console.log(union1([1, 2], [2, 2, 3]));
console.log(union2([1, 2], [2, 2, 3]));

// 取差集
function subtraction(a, b) {
  return a.concat(b).filter((item) => !(a.includes(item) && b.includes(item)))
}
console.log(subtraction([1, 2, 10], [2, 2, 3]));


// 发布订阅模式
function handler(msg) {
  console.log(msg)
}

function handler1(msg) {
  console.log(msg)
}
var customEvent = {
  event: {},
  add(type, fn) {
    if (!this.event[type]) {
      this.event[type] = [];
    }
    this.event[type].push(fn);
  },
  emit(type, message) {
    for (let i = 0; i < this.event[type].length; i++) {
      this.event[type][i](message);
    }
  },
  remove(type, fn) {
    for (let i = 0; i < this.event[type].length; i++) {
      if (this.event[type][i] === fn) {
        this.event[type].splice(i, 1);
        console.log('success');
        console.log(this.event[type].length);
      }
    }
  }
}

customEvent.add('msg', handler);
customEvent.add('msg', handler1);
customEvent.emit('msg', {
  'name': 'jin'
});
customEvent.remove('msg', handler);



// 观察者模式
// 被观察者
class Subject {

  constructor() {
    // 存储观察者
    this.observers = [];
  }
  // 提供接收观察者的方法
  add(item) {
    this.observers.push(item);
  }

  // 删除某一观察者
  remove(item) {
    let len = this.observers.length;
    for (let i = 0; i < len; i++) {
      if (this.observers[i] === item) {
        this.observers.splice(i, 1);
      }
    }
  }

  // 触发
  notify() {
    this.observers.map((item) => {
      item.update();
    })
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  update() {
    console.log(`i'm ${this.name}`);
  }
}

let subject = new Subject();
let o1 = new Observer('baba');
let o2 = new Observer('mama');
subject.add(o1);
subject.add(o2);
subject.notify();
subject.remove(o2);
subject.notify();

// 单例模式
// 顾名思义，整个程序生命周期只有一个某类的实例
class Person1 {
  constructor(name) {
    this.name = name;
  }
}

var Singleton = (function Singleton() {
  var singleton = null;
  return function (...rest) {
    if (!singleton) {
      singleton = new Person1(...rest);
    }
    return singleton;
  }
}());

var person = new Singleton('name');
var person1 = new Singleton('NAME1');
console.log(person === person1);


// 手动实现简单的深拷贝(可拷贝Symbol)
function deepClone(obj, map = new weakMap()) {
  // null, nudefined直接返回
  if (obj == null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 基本类型/方法
  if (typeof obj !== 'object') return obj;
  if (map.get(obj)) return obj;
  map.set(target, true);
  const o = Array.isArray(target) ? [] : {};
  // for (const key in obj) {
  //   // 没有当symbol属性时的值
  //   if (obj.hasOwnProperty(key)) {
  //     const element = obj[key];
  //     o[key] = typeof element === 'object' ? deepClone(element) : element;
  //   }
  // }
  for (const key of Reflect.ownKeys(obj)) {
    const element = obj[key];
    o[key] = typeof element === 'object' ? deepClone(element, map) : element;
  }
  return o;
}

var obj10 = {
  a: '100',
  b: undefined,
  c: null,
  d: Symbol(2),
  e: /^\d+$/,
  f: new Date,
  g: true,
  arr: [10, 20, 30],
  school: {
    name: 'cherry',
  },
  2: 1234,
  [Symbol()]: 123,
  fn: function fn() {
    console.log('fn');
  }
}
console.log(deepClone(obj10));

// 非0非负最小值的索引
// 例如：[10,21,0,-7,35,7,9,23,18] 输出 5, 7 最小
function getIndex(arr) {
  let index = null;
  let min = Math.min(...arr.filter((item) => item > 0));
  index = arr.indexOf(min);
  return index;
}
console.log(getIndex([10, 21, 0, -7, 35, 7, 9, 23, 18]));


const list = [1, 2, 3]
const square = num => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000)
  })
}

function test() {
  // list.forEach(async (x)=> {
  //   const res = await square(x);
  //   console.log(res);
  // });

  // 间隔1s输出1， 4， 9
  list.reduce((pre, cur) => {
    return pre
      .then(() => {
        return square(cur);
      })
      .then(console.log);
  }, Promise.resolve());

  // 使用async-await
  // list.reduce(async (pre, cur) => {
  //   await pre;
  //   const data = await square(cur);
  //   return console.log(data);
  // }, Promise.resolve());
}
test();


// 模拟实现Promise.finally
// fimally中是一个callback, 无论成功还是失败都会执行
Promise.prototype.finally = function (callback) {
  const p = this.constructor;
  return this.then(
    (value) => {
      p.resolve(callback()).then(() => value);
    },
    (reason) =>
    p.resolve(callback()).then(() => {
      throw new Error(reason);
    })
  );
};

// 最简code实现最小大于0的索引
function getIndex1(arr) {
  let index;
  let min = [...arr].sort((a, b) => a - b).find((a) => a > 0);
  index = arr.indexOf(min);
  return index;
}
console.log(getIndex1([10, 21, 0, -7, 35, 7, 9, 23, 18]));

function sum1To100(n, total = 0) {
  if (n === 0) return total;
  return sum1To100(n - 1, total + n);
}
console.log(sum1To100(100));

Promise.prototype.done = function () {
  this.catch(
    (err) => {
      setTimeout(() => {
        throw new Error(err);
      });
    }
  );
}

// ----------------------start-------------------
Array.prototype.myMap1 = function (callback) {
  const results = [];
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    const element = this[i];
    results.push(callback(element, i, this));
  }
  return results;
}

Array.prototype.myFilter1 = function (callback) {
  const results = [];
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    const element = this[i];
    callback(element, i, this) && results.push(element);
  }
  return results;
};

Array.prototype.myReduce2 = function (callback, prev) {
  let results = prev ? prev : this[0];
  for (let i = prev ? 1 : 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    const element = array[i];
    results = callback(result, element, i, this);
  }
  return results;
};

Array.prototype.myEvery1 = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    const element = this[i];
    if (!callback(element, i, this)) return false;
  }
  return true;
};

Array.prototype.mySome1 = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    const element = this[i];
    if (callback(element, i, this)) return true;
  }
  return false;
};

Array.prototype.find1 = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!this.hasOwnProperty(i)) continue;
    const element = this[i];
    if (callback(element, i, this)) return element;
  }
}

Array.prototype.myFlatInfinity = function () {
  let arr = this;
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
};

Array.prototype.myFlatInfinity1 = function () {
  let arr = this;
  // 使用reduce
  return arr.reduce(
    (prev, cur) => prev.concat(Array.isArray(cur) ? cur.myFlatInfinity() : cur),
    []
  );
};

// 使用reduce实现数组map方法
Array.prototype.myMap2 = function (callback) {
  return this.reduce((prev, cur, i, this) => prev.concat(callback(cur, i, this)), []);
}
// ----------------------end---------------------

// ----------------------start-------------------
// 动态规划实现fib
function fibonacci_dp(n) {
  if (n === 1) return 0;
  if (n === 2 || n === 3) return 1;
  let prev = 0,
    next = 1;
  while (n > 3) {
    [prev, next] = [next, prev + next];
    n--;
  }
  return next;
}
// ----------------------end---------------------

// ----------------------start-------------------
// Reflect实现单例模式
function Singleton(fn) {
  let instance;
  const handler = {
    construct(target, args) {
      if (!instance) instance = Reflect.construct(target, args);
      return instance;
    }
  }
  return new Proxy(fn, handler);
}
// ----------------------end---------------------

// ----------------------start-------------------
// 洗牌算法
function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let randomIndex = i + (Math.floor(Math.random() * (array.length - i)));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
// ----------------------end---------------------

// ----------------------start-------------------
// 0延时的settimeout
window.setZeroTimeout = (function() {
  const callbackArray = [];
  const messageName = 'zero-timeout-message';
  function zeroTimeout(callback) {
    callbackArray.push(callback);
    window.postMessage(messageName, '*');
  }

  function handler(evt) {
    if (messageName === evt.data && window === evt.source) {
      evt.stopPropagation();
      if (callbackArray.length) {
        const fn = callbackArray.shift();
        fn();
      }
    }
  }
  window.addEventListener('message', handler, true);
  return zeroTimeout;
})();
// ----------------------end---------------------






