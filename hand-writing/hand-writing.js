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







