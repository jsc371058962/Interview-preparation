Function.prototype.myCall = function (o, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function!');
  }
  const ctx = o ?? window;
  const symbol = Symbol('call');
  ctx[symbol] = this;
  const result = ctx[symbol](...args);
  delete ctx[symbol];
  return result;
}

Function.prototype.myApply = function (o, args) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function!');
  }
  const ctx = o ?? window;
  const symbol = Symbol('apply');
  ctx[symbol] = this;
  const result = ctx[symbol](...args);
  delete ctx[symbol];
  return result;
}

Function.prototype.myBind = function (o, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function!');
  }
  const ctx = o ?? window;
  const FToBind = this;
  function Fn(...rest) {
    return FToBind.apply(this instanceof Fn ? this : ctx, [...args, ...rest]);
  }
  if (this.prototype) {
    Fn.prototype = this.prototype;
  }
  return Fn;
}

// 寄生式组合继承
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log(this.name);
}

function Man(age, name) {
  Person.call(this, name);
  this.age = age;
}
Man.prototype = Object.create(Person.prototype);
Man.prototype.constructor = Man;
Man.prototype.getAge = function () {
  console.log(this.age);
}

var man = new Man(18, 'xiaoming');

// class继承使用es5来实现///////没实现完全
function SuperTye(name) {
  this.name = name;
}
SuperTye.prototype.sayName = function () {
  console.log(this.name);
}

function SubType(age, name) {
  SuperTye.call(this, name);
  this.age = age;
}

function inherit(son, father) {
  Object.setPrototypeOf(son, father);
  Object.setPrototypeOf(son.prototype, father.prototype);
}

inherit(SubType, SuperTye);

// 实现new
function createNew(fn, ...args) {
  const o = {};
  Object.setPrototypeOf(o, fn.prototype);
  const result = fn.apply(null, args);
  return typeof result === 'object' || typeof result === 'function'
    ? result
    : o;
}

// 实现instanceof
function myInstanceof(left, right) {
  let l = Object.getPrototypeOf(left);
  const r = right.prototype;
  while (l) {
    if (l === r) return true;
    l = Object.getPrototypeOf(l);
  }
  return false;
}

// 实现myCreate
function myCreate(o) {
  function F() {};
  F.prototype = o;
  return new F();
}

// 实现Object.assign
Object.myAssign = function (target, ...sources) {
  // 浅复制
  const o = target;
  for (const obj of sources) {
    if (obj === null) continue;
    for (const item of Reflect.ownKeys(obj)) {
      o[item] = obj[item];
    }
  }
  return o;
}

// 实现防抖综合版本
function debounce(fn, timeout, immidate = false) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    if (immidate) {
      const isCallNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
      if (isCallNow) fn.apply(null, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(null, args);
      }, timeout);
    }
  };
}

// 实现节流时间戳+延时
function throttle(fn, timeout) {
  const start = +new Date();
  return function (...args) {
    if (+new Date() - start >= timeout) {
      fn.apply(null, args);
      start = +new Date();
    }
  }
}
function throttle1(fn, timeout) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(null, args);
      timer = null;
    }, timeout);
  }
}

// 深拷贝
function deepClone(o, map = new WeakMap()) {
  if (map.has(o)) return o;
  if (o instanceof Date) return new Date(o);
  if (o instanceof RegExp) return new RegExp(o);
  if (typeof o !== 'object') return o;
  map.set(o, true);

  const obj = new o.constructor;
  for (const key of Reflect.ownKeys(o)) {
    const element = o[key];
    if (typeof element === 'object') {
      obj[key] = deepClone(element, map);
    } else {
      obj[key] = element;
    }
  }
  return o;
}

// 数组扁平化
// reduce
function flat(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flat(cur) : cur);
  }, []);
}

function flat1(arr) {
  while (arr.som((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

function flat2(arr) {
  return arr.flat(Infinity);
}

var array = [];
function *flat3(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flat(item);
    } else {
      array.push(item);
    }
  }
}

var array1 = [];
function flat4(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      flat4(item);
    } else {
      array1.push(item);
    }
  }
}


// 柯理化
function curry(fn, ...args) {
  const len = fn.length;
  return function (...rest) {
    rest = [...args, ...rest];
    if (len >= rest.length) {
      return fn.apply(null, rest);
    } else {
      return curry.apply(fn, ...rest);
    }
  }
}

// 手写观察者模式
class Subject {
  constructor() {
    this.observser = [];
    this.state = '';
  }

  add(instance) {
    this.observser.push(instance);
  }

  remove(key) {
    if (this.observser.includes(key)) {
      const k = this.observser.indexOf(key);
      this.observser.splice(k, 1);
    }
  }

  notify(change) {
    this.state = change;
    this.observser.forEach((instance) => {
      instance.update(this.state);
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(change) {
    console.log(this.name, change);
  }
}
var subject = new Subject();
var observer1 = new Observer('xiaoming');
var observer2 = new Observer('xiaohong');
subject.add(observer1);
subject.add(observer2);
subject.notify('abc');


// 发布订阅模式
class EventEmmit {
  constructor() {
    this.events = {};
  }
  addListener(type, cb) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(cb);
  }
  removeListener(type, cb) {
    if (!this.events[type]) {
      return;
    }
    for (const [key, item] of this.events[type].entries()) {
      if (item === cb) {
        this.events[type].splice(key, 1);
      }
    }
  }
  fireEvent(type, param) {
    if (!this.events[type]) {
      return;
    }
    this.events[type].forEach((cb) => {
      cb(param);
    });
  }
  once(type, callback) {
    function clousure(param) {
      callback(param);
      this.removeListener(type);
    }
    this.addListener(type, clousure);
  }
}

// 生成min~max之间的随机数
function randomNumber(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

// 数组随机排序
function randomSort(a, b) {
  return Math.random() > 0.5 ? a - b: b - a;
}

// 通用事件
var EventUtils = {
  addListener(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler);
    } else if (element.attachEvent) {
      element.attachEvent(`on${type}`, handler);
    } else {
      element[`on${type}`] = handler;
    }
  },
  removeListener(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler);
    } else if (element.detachEvent) {
      element.detachEvent(type, handler);
    } else {
      element[`on${type}`] = null;
    }
  },
  getTarget(event) {
    return event.target || event.srcElement;
  },
  stopPropagation(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  preventDefault(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
}

// sleep函数
function sleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
(async function orderExec() {
  console.log(1);
  await sleep(duration);
  console.log(2);
})();

// 模板引擎
function render(template, data) {
  const reg = /\{\{(.*?)\}\}/g;
  return template.replace(reg, (match, key) => data[key]);
}
var template = "{{name}}很厉害，才{{age}}岁";
var context = { name: "jin", age: "15" };
console.log(render(template, context));

// 转换成驼峰命名
var s1 = 'get-element-by-id';
function getCamerCase(s) {
  return s.replace(/-\w/g, (match, str) => {
    return str.slice(1).toUpperCase();
  });
}

// 查找字符串出现最多的
function getLargestStr(str) {
  // 使用hashmap
  const map = new Map();
  for (const s of str) {
    if (map.has(s)) {
      let count = map.get(s);
      map.set(s, ++count);
    } else {
      map.set(s, 1);
    }
  }
  // 找最大数字
  let max = 0;
  let largestStr = '';
  for (const [s, num] of map.entries()) {
    if (num > max) {
      max = num;
      largestStr = s;
    }
  }
  return [largestStr, max];
}




