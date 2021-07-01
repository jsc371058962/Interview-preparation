/**
 * 大纲:
 * 1. 5种排序算法, 冒泡排序, 选择排序, 直接插入排序, 归并排序, 快速排序
 * 2. 二分查找
 * 3. 二叉树的(前中后层)遍历, 包括递归和迭代
 * 4. 深度优先遍历(DFS)和广度优先遍历(BFS)
 * 5. Virtual DOM转真实DOM
 * 6. 版本号排序
 * 7. rgb(xxx, xxx, xxx)转16进制颜色(大写)
 * 8. 异步调度器Scheduler
 * 9. 栈结构实现flat数组
 * 10. 下划线/中划线命名转小驼峰命名
 * 11. 实现bind
 * 12. 洗牌算法, 原地
 * 13. 手写用 ES6proxy 如何实现 arr[-1] 的访问
 * 14. 写一个 mySetInterVal(fn, a, b),每次间隔 a, a + b, a + 2b的时间
 * 15. 手写async/await
 * 16. 模板字符串
 * 17. LRU算法
 * 18. 页面上有三个按钮，分别为 A、B、C，点击各个按钮都会发送异步请求且互不影响******
 * 19. 非含7或7倍数的数的集合
 * 20. 防抖节流
 * 21. 实现一个 add 方法(不定参数的柯理化)
 * 22. 请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式
 * 23. Object.is手动实现
 * 24. 列表转成树形结构
 * 25. 树转数组
 */

// 冒泡
function bubbleSort(arr) {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
// 选择
function selectSort(arr) {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}
// 插入
function insertSort(arr) {
  const length = arr.length;
  for (let i = 1; i < length; i++) {
    const loopNumber = array[i];
    let j = i - 1;
    while (j >= 0 && loopNumber > arr[j]) {
      arr[j + 1] = arr[i];
      j--;
    }
    arr[j + 1] = loopNumber;
  }
  return arr;
}
// 归并
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = ~~(arr.length / 2);
  const leftArray = arr.slice(0, mid);
  const rightArray = arr.slice(mid);
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
// 快排
function quickSort(arr, start = 0, end = arr.length - 1) {
  if (end - start <= 0) return;
  const pivotIndex = partition(arr, start, end);
  quickSort(arr, start, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, end);
  return arr;
}
function partition(arr, start, end) {
  const pivot = arr[end];
  let j = start;
  for (let i = start; i <= arr[end] ; i++) {
    if (arr[i] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      j++;
    }
  }
  return j - 1;
}
// 先序遍历
function preorderTraverse(root) {
  if (!root) return [];
  const stack = [root], nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }
  return nodeList;
}
// 中序遍历
function inorderTraverse(root) {
  if (!root) return [];
  const stack = [], nodeList = [];
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
// 后序遍历
function postorderTraverse(root) {
  if (!root) return [];
  const stack = [root], nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.unshift(node.val);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }
  return nodeList;
}
// 层序遍历
function levelTraverse(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root.val);
  const queue = [];
  root.left && queue.push(root.left);
  root.right && queue.push(root.right);
  levelTraverse(queue.shift(), nodeList);
  return nodeList;
}
function levelTraverse(root) {
  if (!root) return [];
  const queue = [root], nodeList = [];
  while (queue.length) {
    const node = queue.shift();
    nodeList.push(node.val);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return nodeList;
}
// dfs
function dfs(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root);
  const children = root.children;
  for (let i = 0; i < children.length; i++) {
    dfs(children[i], nodeList);
  }
  return nodeList;
}
function dfs(root) {
  if (!root) return [];
  const stack = [root], nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.push(node);
    const children = node.children;
    for (let i = children.length - 1; i >= 0; i--) {
      stack.push(children[i]);
    }
  }
  return nodeList;
}
// bfs
function bfs(root) {
  if (!root) return [];
  const queue = [root], nodeList = [];
  while (queue.length) {
    const node = queue.shift();
    nodeList.push(node);
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
      queue.push(children[i]);
    }
  }
  return nodeList;
}
// Virtual DOM转真实DOM
function _render(vnode) {
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  const { tag, attrs, children } = vnode;
  const dom = document.createElement(tag);
  if (attrs) {
    for (const key in attrs) {
      if (Object.hasOwnProperty.call(attrs, key)) {
        dom.setAttribute(key, attrs[key]);
      }
    }
  }
  children.forEach((node) => dom.appendChild(_render(node)));
  return dom;
}
// 版本号排序
function versionSort(arr) {
  return arr.sort((a, b) => {
    const arr1 = a.split('.');
    const arr2 = b.split('.');
    let i = 0;
    while (true) {
      const s1 = arr1[i];
      const s2 = arr2[i];
      i++;
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }
      if (s1 === s2) continue;
      return s2 - s1;
    }
  });
}
// rgb(xxx, xxx, xxx)转16进制颜色(大写)
function transform2Hex(string) {
  const arr = string.match(/\d+/g);
  const toHex = (str) => Number(str).toString(16).padStart('0', 2);
  return arr.reduce((prev, cur) => prev + toHex(cur), '#').toUpperCase();
}
// 异步调度器Scheduler(输出2, 3, 1, 4)
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
    const idx = this.doingTasks.push(promise);
    promise().then(() => {
      this.doingTasks.splice(idx, 1);
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
// 栈结构实现flat数组
function flatten(array) {
  const stack = [...array], result = [];
  while (stack.length) {
    const item = stack.shift();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  return result;
}
// 深度控制的flatten
function flatten(array, depth = 1) {
  return array.reduce((prev, cur) => {
    return prev.concat(
      depth > 1 && Array.isArray(cur) ? flatten(cur, depth - 1) : cur,
    );
  }, []);
}
// 下划线/中划线命名转小驼峰命名
function transform2CamelCase(string) {
  return string.replace(/(_\-)\w/g, (match) => match.slice(1).toUpperCase());
}
// 实现bind
Function.prototype.myBind = function myBind(o, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function!');
  }
  const obj = null == o ? window : Object(o),
    function fn() {}
  fToBind = this;

  function F(...rest) {
    return fToBind.apply(this instanceof F ? this : obj, [...args, ...rest]);
  }
  if (this.prototype) {
    fn.prototype = this.prototype;
  }
  F.prototype = new fn();
  return F;
}
// 洗牌算法, 原地
function shuffle(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const randomIdx = ~~(Math.random() * (length - i)) + i;
    [array[i], array[randomIdx]] = [array[randomIdx], array[i]];
  }
  return array;
}
// 手写用 ES6proxy 如何实现 arr[-1] 的访问
function createArr(...rest) {
  const arr = [...rest];
  const handler = {
    get(target, key) {
      key = Number(key);
      if (Number.isNaN(index)) return -1;
      if (key < 0) {
        return Reflect.get(target, target.length + key);
      }
      return Reflect.get(key);
    }
  };
  return new Proxy(arr, handler);
}
// 写一个 mySetInterVal(fn, a, b),每次间隔 a, a + b, a + 2b的时间
// 然后写一个 myClear，停止上面的 mySetInterVal
(function (exports) {
  let timer = null,
    count = 0;
  function mySetInterVal(f, a, b) {
    timer = setTimeout(() => {
      count++;
      f();
      mySetInterVal(f, a, b);
    }, a + b * count);
  }
  function myClear() {
    clearTimeout(timer);
    timer = null;
    count = 0;
  }
  exports.mySetInterVal = mySetInterVal;
  exports.myClear = myClear;
})(window);
// 手写async/await
function asyncFunction(gen) {
  if (typeof gen === 'function') gen = gen();
  if (!gen || typeof gen.next !== 'function') {
    throw new TypeError(`${gen.next} is not a function!`);
  }
  return new Promise((resolve, reject) => {
    function step(type, val) {
      let result;
      try {
        result = gen[type](val);
      } catch (error) {
        reject(error);
      }
      const {
        done,
        value
      } = result;
      if (done) return resolve(value);
      return Promise.resolve(value).then((data) => {
        step('next', data);
      }, (error) => {
        step('throw', error);
      });
    }
    step('next');
  });
}
// 模板字符串
var o = {
  name: 'jin',
  age: 100
};
var string = "my name is {{name}}, i'm {{age}} years old.";
console.log(getString(string, o));
function getString(string) {
  return string.replace(/\{\{(.*?)\}\}/g, (match, $1) => o[$1]);
}
// LRU算法
class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.map = new Map();
  }
  push(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else {
      if (this.map.size >= this.limit) {
        this.map.delete([...map.keys][0]);
      }
    }
    this.map.set(key, value);
  }
  get(key) {
    if (this.map.has(key)) {
      const res = this.map.get(key);
      this.map.delete(key);
      this.map.set(key, res);
      return res;
    }
    return -1;
  }
}
// 页面上有三个按钮，分别为 A、B、C，点击各个按钮都会发送异步请求且互不影响
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
    return handlerClick(tag, ~~(Math.random() * 3) + 1);
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
// 非含7或7倍数的数的集合
function getExcept7Array(n = 100) {
  const nums = [];
  for (let i = 0; i <= n; i++) {
    if (i % 10 === 7 || !(i % 7)) {
      continue;
    }
    nums.push(i);
  }
  return nums;
}
// 防抖(支持立即执行版本)
function debounce(fn, timeout, immediate = false) {
  let timer = null;
  return function(...rest) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const isCallNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
      if (isCallNow) fn.call(this, ...rest);
    } else {
      timer = setTimeout(() => {
        fn(...rest);
        timer = null;
      });
    }
  }
}
// 节流(时间戳 + 定时器)
function throttle(fn, timeout) {
  let prevTime = +new Date();
  return function(...rest) {
    if (+new Date() - prevTime >= timeout) {
      fn.call(this, ...rest);
      prevTime = +new Date();
    }
  }
}
function throttle1(fn, timeout) {
  let timer = null;
  return function(...rest) {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...rest);
      timer = null;
    }, timeout);
  }
}
// 实现一个 add 方法(不定参数的柯理化)
function currying(fn, ...args) {
  return function(...rest) {
    if (rest.length) {
      rest = [...args, ...rest];
      return currying(fn, ...rest);
    }
    return fn(...args);
  }
}
function f(...arr) {
  return arr.reduce((prev, cur) => prev + cur);
}
var add = currying(f);
add(1)(2, 3)(4)()
// 方法2
function add(...rest) {
  function compute(nums) {
    return nums.reduce((prev, cur) => prev + cur);
  }
  let total = compute(rest);
  function f(...args) {
    if (!args.length) return f;
    total += compute(args);
    return f;
  }
  f.toString = function() {
    return total;
  }
  return f;
}
// 22. 请实现 DOM2JSON 一个函数，可以把一个 DOM 节点输出 JSON 的格式
function dom2JSON(root) {
  const res = {
    tag: root.tagName,
    children: []
  }
  for (const item of res.children) {
    res.children.push(dom2JSON(item));
  }
  return res;
}
// 23. Object.is手动实现
Object.is = function(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y;
}
// 24. 列表转成树形结构
// 迭代
function toTree(list, parId = 0) {
  const result = [], obj = {};
  list.forEach((el) => obj[el.id] = el);
  for (let i = 0, len = list.length; i < len; i++) {
    const pId = list[i].parentId;
    if (pId === parId) {
      result.push(list[i]);
      continue;
    }
    if (obj[id].children.length) {
      obj[id].children.push(list[i]);
    } else {
      obj[i].children = [list[i]];
    }
  }
  return result;
}
// 递归
function toTree(list, parId = 0) {
  const len = list.length;
  function loop(parId) {
    const res = [];
    for (let i = 0; i < len; i++) {
      const item = list[i];
      if (parId === item.parentId) {
        item.children = loop(item.id);
        res.push(item);
      }
    }
    return res;
  }
  return loop(parId);
}
// 25. 树转数组
// dfs, 迭代
function transformTree2Array(root) {
  if (!root) return [];
  const stack = [root], nodeList = [];
  while (stack.length) {
    const item = stack.pop();
    const { id, text, parentId } = item;
    nodeList.push({ id, text, parentId });
    const children = item.children;
    if (children) {
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return nodeList;
}
// dfs, 递归
function transformTree2Array(root, nodeList = []) {
  if (!root) return [];
  const { id, text, parentId, children } = root;
  nodeList.push({ id, text, parentId });
  if (children) {
    for (let i = 0; i < children.length; i++) {
      transformTree2Array(children[i], nodeList);
    }
  }
  return nodeList;
}
// bfs, 迭代
function transformTree2Array(root) {
  if (!root) return [];
  const queue = [root], nodeList = [];
  while (queue.length) {
    const item = queue.shift();
    const { id, text, parentId, children } = item;
    nodeList.push({ id, text, parentId });
    if (children) {
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i]);
      }
    }
  }
  return nodeList;
}

