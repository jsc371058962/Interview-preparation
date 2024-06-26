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

// class继承使用es5来实现
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
  return (typeof result === 'object' && result !== null) ||
    typeof result === 'function'
    ? result
    : o;
}

// 实现instanceof
function myInstanceof(left, right) {
  // 基本数据类型
  if (typeof left !== 'object' || left === null) return false;
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
function debounce(fn, timeout, immediate = false) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const isCallNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
      if (isCallNow) fn.apply(null, args);
    } else {
      timer = setTimeout(() => {
        fn(...args);
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
  if (o == null) return o;
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
  while (arr.some((item) => Array.isArray(item))) {
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
// 有深度控制
function flat5(arr, depth = 1) {
  return arr.reduce(
    (prev, cur) =>
      prev.concat(
        depth > 1 && Array.isArray(cur) ? flat5(cur, depth - 1) : cur
      ),
    []
  );
}
//使用栈结构
function flat6(arr) {
  const stack = [];
  while (arr.length) {
    const pop = arr.pop();
    if (Array.isArray(pop)) {
      arr.push(...pop);
    } else {
      stack.unshift(pop);
    }
  }
  return stack;
}

// 柯理化
function curry(fn, ...args) {
  const len = fn.length;
  return function (...rest) {
    rest = [...args, ...rest];
    if (len >= rest.length) {
      return fn.apply(null, rest);
    } else {
      return curry(fn, ...rest);
    }
  };
}

// 手写观察者模式
class Subject {
  constructor() {
    this.observer = [];
    this.state = '';
  }

  add(instance) {
    this.observer.push(instance);
  }

  remove(key) {
    if (this.observer.includes(key)) {
      const k = this.observer.indexOf(key);
      this.observer.splice(k, 1);
    }
  }

  notify(change) {
    this.state = change;
    this.observer.forEach((instance) => {
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
class EventEmit {
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
    function closure(param) {
      callback(param);
      this.removeListener(type, closure);
    }
    this.addListener(type, closure);
  }
}

// 生成min ~ max之间的随机数
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
function getCamelCase(s) {
  return s.replace(/-\w/g, (match) => {
    return match.slice(1).toUpperCase();
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
    for (let j = 0; j < len - i - 1; j++) {
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
      return Promise.resolve(value).then(
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
    if (typeof fns[i] !== 'function') {
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
function preOrderTraverse(node, nodeList = []) {
  if (!node) return [];
  nodeList.push(node.val);
  preOrderTraverse(node.left, nodeList);
  preOrderTraverse(node.right, nodeList);
  return nodeList;
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
function inOrder(node, nodeList = []) {
  if (!node) {
    return [];
  }
  inOrder(node.left, nodeList);
  nodeList.push(node.val);
  inOrder(node.right, nodeList);
  return nodeList;
}
// 迭代
function inOrderTraverse(root) {
  if (!root) return [];
  const stack = [],
    nodeList = [];
  let node = root;
  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      const pop = stack.pop();
      nodeList.push(pop.val);
      if (pop.right) {
        node = pop.right;
      }
    }
  }
  return nodeList;
}

// 后序遍历, 递归
function postOrderTraverse(root, nodeList = []) {
  if (!root) {
    return [];
  }
  postOrderTraverse(root.left, nodeList);
  postOrderTraverse(root.right, nodeList);
  nodeList.push(root.val);
  return nodeList;
}
// 迭代
function postOrderTraverse(root) {
  if (!root) return [];
  const stack = [root],
    nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.unshift(node.val);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }
  return nodeList;
}

// 层序遍历, 递归
function levelTraverse(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root.val);
  if (root.left) queue.push(root.left);
  if (root.right) queue.push(root.right);
  levelTraverse(queue.shift(), nodeList);
  return nodeList;
}
// 层次遍历, 迭代
function levelTraverse(root) {
  if (!root) return [];
  const queue = [root],
    nodeList = [];
  while (queue.length) {
    let node = queue.shift();
    nodeList.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return nodeList;
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
    for (let j = 0; j < len - i - 1; j++) {
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

// 版本号排序
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
      return prev + +cur * 1e3 ** (maxLen - idx - 1);
    }, 0);
  }
  return array.sort((a, b) => (gen(a) > gen(b) ? -1 : 1));
}
console.log(_sort(arr));

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

// 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]
// 将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
function getNestArray(array) {
  if (!array.length) return [];
  // 1. 排序, 去重
  array = [...new Set(array)].sort((a, b) => a - b);
  let length = array.length;
  const newArray = [];
  let i = 0;
  while (i < length) {
    // 向下取整
    const t = ~~(array[i] / 10);
    if (!newArray[t]) newArray.push([]);
    newArray[t].push(array[i++]);
  }
  return newArray;
}
console.log(getNestArray([2, 10, 3, 4, 5, 11, 10, 11, 20]));

// 手写async/await
function asyncFunc(gen) {
  if (typeof gen === 'function') gen = gen();
  if (!gen || typeof gen.next !== 'function')
    throw new TypeError('Next not a function!');
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
      return Promise.resolve(value).then(
        (data) => {
          return step('next', data);
        },
        (error) => {
          return step('throw', error);
        }
      );
    }
    step('next');
  });
}

// 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，
// 然后写一个 myClear，停止上面的 mySetInterVal
(function mySetInterValClosure() {
  let count = 0,
    timer = null;
  function mySetInterVal(fn, a, b) {
    timer = setTimeout(function () {
      count++;
      fn();
      mySetInterVal(fn, a, b);
    }, a + count * b);
  }
  function myClear() {
    clearTimeout(timer);
    timer = null;
    count = 0;
  }

  window.mySetInterVal = mySetInterVal;
  window.myClear = myClear;
})();
function log() {
  console.log(123);
}
mySetInterVal(log, 1000, 1000);

// 2.合并二维有序数组成一维有序数组，归并排序的思路
// 先扁平化再用归并
var newArray = array.flat(2);
function mergeSort(array) {
  if (array.length <= 1) return array;
  const mid = ~~(array.length / 2);
  const leftArray = array.slice(0, mid);
  const rightArray = array.slice(mid);
  return merge(mergeSort(leftArray), mergeSort(rightArray));
}
function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  left.length ? result.push(...left) : result.push(...right);
  return result;
}

// 3.斐波那契数列
function fib(n, p1 = 0, p2 = 1) {
  if (n <= 1) return p2;
  return fib(n - 1, p2, p1 + p2);
}

// 4.防抖&节流
function debounce(fn, timeout, immediate = false) {
  let timer = null;
  return function (...rest) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const isCallNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
      if (isCallNow) fn.apply(null, rest);
    } else {
      timer = setTimeout(() => {
        fn(...rest);
      }, timeout);
    }
  };
}
function throttle(fn, timeout) {
  let start = Date.now();
  return function (...rest) {
    if (Date.now() - start >= timeout) {
      fn.apply(null, rest);
      start = Date.now();
    }
  };
}
function throttle1(fn, timeout) {
  let timer = null;
  return function (...rest) {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...rest);
      timer = null;
    }, timeout);
  };
}

// 实现_.get
function get(obj, param, defaultValue) {
  if (!Array.isArray(param)) return defaultValue;
  return param.reduce((a, b) => a[b], obj);
}
get(object, ['a', '0', 'b', 'c']);

// 15.实现 add(1)(2)(3)
function currying(fn, ...args) {
  const length = fn.length;
  return function (...rest) {
    rest = [...args, ...rest];
    if (rest.length === length) {
      return fn.apply(null, rest);
    } else {
      return currying(fn, ...rest);
    }
  };
}
function compute(a, b, c) {
  return a + b + c;
}
add = currying(compute);
add(1)(2)(3);

// 24.实现 Promise.all
Promise.myAll = function myAll(promises) {
  if (Array.isArray(promises))
    throw new TypeError(`${promises} is not an array!`);
  return new Promise((resolve, reject) => {
    if (!promises.length) resolve([]);
    const result = [];
    let count = 0;
    promises.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          result[index] = value;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
};

// 30.手写用 ES6proxy 如何实现 arr[-1] 的访问
function createArray(...rest) {
  const handler = {
    get(target, prop) {
      prop = Number(prop);
      if (Number.isNaN(prop)) return -1;
      if (prop >= 0) return Reflect.get(target, prop);

      return Reflect.get(target, target.length + prop);
    }
  };
  let arr = [...rest];
  return new Proxy(arr, handler);
}
var arr = createArray(0, 2, 3, 5);
console.log(arr[-1]);

// JS实现一个带并发限制的异步调度器Scheduler
// 保证同时运行的任务数最多有俩个
// 完善代码中Scheduler类

//要求
// output : 2 3 1 4
//一开始1,2俩个任务进入队列
//500ms时,2完成,输出2,任务3进入队列
//800ms时,3完成,输出3,任务4进入队列
//1000ms时,1完成,输出1
//1200ms时,4完成,输出4
class Scheduler {
  constructor() {
    this.limit = 2;
    this.tasks = [];
    this.doingTasks = [];
  }

  add(task) {
    if (this.doingTasks.length < this.limit) {
      this.run(task);
    } else {
      this.tasks.push(task);
    }
  }

  run(promise) {
    this.doingTasks.push(promise);
    const index = this.doingTasks.length - 1;
    promise().then(() => {
      this.doingTasks.splice(index, 1);
      if (this.tasks.length) {
        this.run(this.tasks.shift());
      }
    });
  }
}
function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
var scheduler = new Scheduler();
function addTask(time, order) {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
}
addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);

// 洗牌算法, 原地
function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const randomIdx = i + ~~(Math.random() * (array.length - i));
    [array[i], array[randomIdx]] = [array[randomIdx], array[i]];
  }
  return array;
}

// 深拷贝
function deepClone(obj, map = new WeakMap()) {
  if (map.has(obj)) return obj;
  if (obj == null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== 'object') return obj;
  map.set(obj, true);
  const o = new obj.constructor();
  for (const key of Reflect.ownKeys(o)) {
    o[key] = typeof obj[key] === 'object' ? deepClone(obj[key], map) : obj[key];
  }

  return o;
}

// 封装一个jsonp
function jsonp({ url, params }) {
  function getCallbackName() {
    return Math.random().toString(16).slice(2);
  }
  const getRandomName = 'get' + getCallbackName();
  function spliceParams(args) {
    let pStrings = '';
    for (const key in args) {
      if (Object.hasOwnProperty.call(args, key)) {
        pStrings += `${key}=${encodeURIComponent(args[key])}&`;
      }
    }
    return url.includes('?')
      ? `${url}${pStrings}callback=${getRandomName}`
      : `${url}?${pStrings}callback=${getRandomName}`;
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = spliceParams(params);
    window[getCallbackName] = function (data) {
      document.body.removeChild(script);
      resolve(data);
    };
    document.body.appendChild(script);
  });
}
