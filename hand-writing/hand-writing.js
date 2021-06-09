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
};

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
};

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
};

// 寄生式组合继承
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log(this.name);
};
function Man(age, name) {
  Person.call(this, name);
  this.age = age;
}
Man.prototype = Object.create(Person.prototype);
Man.prototype.constructor = Man;
Man.prototype.getAge = function () {
  console.log(this.age);
};
var man = new Man(18, 'xiaoming');

// class继承使用es5来实现///////没实现完全
function SuperTye(name) {
  this.name = name;
}
SuperTye.prototype.sayName = function () {
  console.log(this.name);
};
function SubType(age, name) {
  SuperTye.call(this, name);
  this.age = age;
}
function inherit(son, father) {
  son.prototype = Object.create(father.prototype, {
    constructor: {
      value: son,
      enumerable: false,
      configurable: false
    }
  });
  Object.setPrototypeOf(son, father);
}
inherit(SubType, SuperTye);
var p = new SubType(18, 'An');

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
  function F() {}
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
};

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
  let start = +new Date();
  return function (...args) {
    if (+new Date() - start >= timeout) {
      fn.apply(null, args);
      start = +new Date();
    }
  };
}
function throttle1(fn, timeout) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(null, args);
      timer = null;
    }, timeout);
  };
}

// 深拷贝
function deepClone(o, map = new WeakMap()) {
  if (map.has(o)) return o;
  if (o instanceof Date) return new Date(o);
  if (o instanceof RegExp) return new RegExp(o);
  if (typeof o !== 'object') return o;
  map.set(o, true);

  const obj = new o.constructor();
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
function* flat3(arr) {
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
  };
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
  return Math.random() > 0.5 ? a - b : b - a;
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
};

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
var template = '{{name}}很厉害，才{{age}}岁';
var context = { name: 'jin', age: '15' };
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

// 排序, 目前学习3种,冒泡选择插入
// 冒泡排序
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
function bubbleSort(array) {
  const len = array.length;
  // 控制循环次数
  for (let i = 0; i < len; i++) {
    // 控制内循环并交换
    for (let j = 0; j < len - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}
bubbleSort(sortArray);

// 选择排序
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
function selectionSort(array) {
  const len = array.length;
  // 控制循环
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (array[i] > array[j]) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  return array;
}
selectionSort(sortArray);

// 直接插入排序
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
function insertSort(array) {
  let len = array.length;
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
insertSort(sortArray);

// 手写async/await
function asyncFunc(gen) {
  return new Promise((resolve, reject) => {
    gen = gen();
    function step(key, result) {
      let generatorResult;
      try {
        generatorResult = gen[key](result);
      } catch (error) {
        reject(error);
      }
      const { value, done } = generatorResult;
      if (done) return resolve(value);
      return Promise.resolve(value).then(
        (data) => {
          step('next', data);
        },
        (error) => {
          step('throw', error);
        }
      );
    }
    step('next');
  });
}
var getData = () =>
  new Promise((resolve) => setTimeout(() => resolve('data'), 1000));
var test = asyncFunc(function* testG() {
  const data = yield getData();
  console.log('data: ', data);
  const data2 = yield getData();
  console.log('data2: ', data2);
  return 'success';
});
test.then((res) => console.log(res));

// 使用Proxy实现一个单例
function singleton(Fn) {
  let instance;
  const handler = {
    construct(target, args) {
      if (!instance) instance = new target(...args);
      return instance;
    }
  };
  return new Proxy(Fn, handler);
}
function Person(name) {
  this.name = name;
}
var PersonSingleTon = singleton(Person);
var p1 = new PersonSingleTon('xiaohong');
var p2 = new PersonSingleTon('xiaoming');

// async/await手写实现
function asyncGeneration(gen) {
  if (typeof gen === 'function') gen = gen();
  if (!gen || typeof gen.next !== 'function')
    throw new TypeError('Not a function!');
  return new Promise((resolve, reject) => {
    function step(type, val) {
      let result;
      try {
        result = gen[type](val);
      } catch (error) {
        reject(error);
      }
      const { value, done } = result;
      if (done) return resolve(value);
      return Promise.resolve().then(
        (value) => {
          return step('next', value);
        },
        (error) => {
          return step('throw', error);
        }
      );
    }
    step('next');
  });
}

// 直接插入排序
function insertSort(array) {
  const len = array.length;
  for (let i = 1; i < len; i++) {
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
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(insertSort(sortArray));

// 选择排序
function selectSort(array) {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (array[i] > array[j]) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  return array;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(selectSort(sortArray));

// 组合函数
function compose(...fns) {
  const firstFn = fns.shift();
  return function (...args) {
    return fns.reduce((prev, cur) => {
      return cur(prev);
    }, firstFn(...args));
  };
}

function compose1(...fns) {
  const length = fns.length;
  let i = length;
  while (i) {
    if (typeof fns[i] !== 'functio') {
      throw new TypeError(`${fn[i]} is not a function!`);
    }
    i--;
  }
  return function (...args) {
    let index = 0;
    let result = fns[index].apply(null, args);
    while (++index < length) {
      result = fns[index].apply(null, result);
    }
    return result;
  };
}

function compose2(...fns) {
  return function (...args) {
    return fns.reduce((prev, cur) => {
      return typeof prev !== 'function' ? cur(prev) : cur(prev(...args));
    });
  };
}
function sum1(a, b) {
  return a + b;
}
function toUpper(str) {
  console.log(str);
  return str.toUpperCase();
}
function add(str) {
  return '===' + str + '===';
}
var comfn = compose2(sum1, toUpper, add);
console.log(comfn('cherry', '27'));

// 获取范围内的随机整数
function getRandomNumber(min, max) {
  return ~~(Math.random() * (max - min) + min);
}

// 回文数
function isPalindromeNumber(number) {
  if (number < 0 || (!(number % 10) && number)) {
    return false;
  }
  let res = 0,
    ret = number;
  while (ret) {
    res = res * 10 + (ret % 10);
    ret = ~~(ret / 10);
  }
  return res === number;
}

// 二叉树的先序遍历
// 递归
var arr = [];
function preOrder(node) {
  if (!node) {
    return;
  }
  arr.push(node.val);
  preOrder(node.left);
  preOrder(node.right);
}

// 迭代, 栈结构
var arr = [];
function preOrder1(head) {
  if (!head) {
    return;
  }
  let stack = [head];
  while (stack.length) {
    const node = stack.pop();
    arr.push(node.val);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
}

// 中序遍历, 深度优先, 递归
var arr = [];
function inOrder(node) {
  if (!node) {
    return;
  }
  inOrder(node.left);
  arr.push(node.val);
  inOrder(node.right);
}

// 后序遍历
var arr = [];
function backOrder(node) {
  if (!node) {
    return;
  }
  backOrder(node.left);
  backOrder(node.right);
  arr.push(node.val);
}

// 层次遍历, 迭代
var arr = [];
function levelOrder(head) {
  if (!head) return;
  let queue = [head];
  while (queue.length) {
    let node = queue.shift();
    arr.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}

// 通用getType方法
function getType(param) {
  return Object.prototype.toString
    .call(param)
    .match(/\[object (.*?)\]/)[1]
    .toLowerCase();
}
console.log(getType(null));

// 模板字符串
function getString(string) {
  return string.replace(/\{\{(\w+)\}\}/g, (match, key) => o[key]);
}
var o = {
  name: 'jin',
  age: 100
};
var string = "my name is {{name}}, i'm {{age}} years old.";
getString(string);

// 冒泡排序
function bubbleSort(array) {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort(sortArray));

// 不定参求和
function _reduce(...args) {
  return args.reduce((prev, cur) => prev + cur, 0);
}
function add(...args) {
  let total = _reduce(...args);
  function f(...rest) {
    total += _reduce(...rest);
    return f;
  }
  f.toString = function () {
    return total;
  };
  return f;
}
console.log(add(1)(2)(3)());

// 比较版本号
var arr = [
  '1.1',
  '2.3.3',
  '4.3.5',
  '0.3.1',
  '0.302.1',
  '4.20.0',
  '4.3.5.1',
  '1.2.3.4.5'
];
function _sort(array) {
  const maxLen = Math.max(...array.map((item) => item.split('.').length));
  function gen(string) {
    return string.split('.').reduce((prev, cur, idx) => {
      return (
        BigInt(prev) + BigInt(cur) * BigInt(1e3) ** BigInt(maxLen - idx - 1)
      );
    }, 0);
  }
  return array.sort((a, b) => (gen(a) - gen(b) ? -1 : 1));
}
_sort(arr);

function _sort(array) {
  return array.sort((a, b) => {
    const arr1 = a.split('.');
    const arr2 = b.split('.');
    let i = 0;
    while (true) {
      const a1 = arr1[i];
      const a2 = arr2[i];
      i++;
      if (a1 === undefined || a2 === undefined) {
        return arr2.length - arr1.length;
      }
      if (a1 === a2) continue;
      return a2 - a1;
    }
  });
}
_sort(arr);

// 已知如下数组：
// 要求: 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
function getFlatAndSortedArray(array) {
  // 先扁平化,再去重,最后排序
  // 扁平化方法多样,使用最近了解的栈结构吧
  const stack = [];
  while (array.length) {
    const pop = array.pop();
    if (Array.isArray(pop)) {
      array.push(...pop);
    } else {
      stack.unshift(pop);
    }
  }
  return [...new Set(stack)].sort((a, b) => a - b);
}
console.log(getFlatAndSortedArray(arr));
