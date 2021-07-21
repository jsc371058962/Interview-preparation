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
 * 18. 页面上有三个按钮，分别为 A、B、C，点击各个按钮都会发送异步请求且互不影响
 * 19. 非含7或7倍数的数的集合
 */

// 冒泡
function bubbleSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (array[j] < array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}
// 选择
function selectSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (array[i] < array[j]) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  return array;
}
// 插入
function insertSort(array) {
  const length = array.length;
  for (let i = 1; i < length; i++) {
    const loopNumber = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] < loopNumber) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = loopNumber;
  }
  return array;
}
// 归并
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
// 快排
function quickSort(array, start = 0, end = array.length - 1) {
  if (end - start < 1) return;
  const pivotIndex = partition(array, start, end);
  quickSort(array, start, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, end);
  return array;
}
function partition(array, start, end) {
  const pivot = array[end];
  let j = start;
  for (let i = start; i <= end; i++) {
    if (array[i] <= pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      j++;
    }
  }
  return j - 1;
}

// 先序,递归
function preorderTraverse(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root.val);
  preorderTraverse(root.left, nodeList);
  preorderTraverse(root.right, nodeList);
  return nodeList;
}
// 迭代
function preorderTraverse(root) {
  if (!root) return [];
  const stack = [],
    nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }
  return nodeList;
}
// 中序, 递归
function inorderTraverse(root, nodeList = []) {
  if (!root) return [];
  inorderTraverse(root.left, nodeList);
  nodeList.push(root.val);
  inorderTraverse(root.right, nodeList);
  return nodeList;
}
// 迭代
function inorderTraverse(root) {
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
// 后序,递归
function postorderTraverse(root, nodeList = []) {
  if (!root) return [];
  postorderTraverse(root.left, nodeList);
  postorderTraverse(root.right, nodeList);
  nodeList.push(root.val);
  return nodeList;
}
// 迭代
function postorderTraverse(root) {
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
// 层序,递归
function levelTraverse(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root.val);
  const queue = [];
  root.left && queue.push(root.left);
  root.right && queue.push(root.right);
  levelTraverse(queue.shift(), nodeList);
  return nodeList;
}
// 迭代
function levelTraverse(root) {
  if (!root) return [];
  const queue = [root],
    nodeList = [];
  while (queue.length) {
    const node = queue.shift();
    nodeList.push(node.val);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
  return nodeList;
}

// 树的遍历
// dfs, 递归
function dfs(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root);
  const children = root.children;
  for (let i = 0; i < children.length; i++) {
    dfs(children[i], dfs);
  }
  return nodeList;
}
// 迭代
function dfs(root) {
  if (!root) return [];
  const stack = [root],
    nodeList = [];
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
// bfs, 迭代
function bfs(root) {
  if (!root) return [];
  const queue = [root],
    nodeList = [];
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
      if (Object.prototype.hasOwnProperty.call(attrs, key)) {
        dom.setAttribute(key, attrs[key]);
      }
    }
  }
  children.forEach((node) => dom.appedChild(_render(node)));
  return dom;
}

// 版本号排序
function versionSort(array) {
  return array.sort((a, b) => {
    const arr1 = a.split('.');
    const arr2 = b.split('.');
    let i = 0;
    while (true) {
      const s1 = arr1[i];
      const s2 = arr2[i];
      i++;
      if (s1 === undefined || s2 === undefined) {
        return s2.length - s1.length;
      }
      if (s1 === s2) continue;
      return s2 - s1;
    }
  });
}

// rgb(xxx, xxx, xxx)转16进制颜色(大写)
function transform2Hex(string) {
  const arr = string.match(/\w+/g);
  const toHex = (str) => Number(str).toString(16).padStart('0', 2);
  return arr.reduce((prev, cur) => prev + toHex(cur), '#').toUpperCase();
}

// 异步调度器Scheduler
// JS实现一个带并发限制的异步调度器Scheduler
// 保证同时运行的任务数最多有俩个
// 完善代码中Scheduler类
// 要求
// ouput : 2 3 1 4
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
    if (this.doingTasks.length < 2) {
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

// 栈结构实现flat数组
function flatten(array) {
  const stack = [];
  while (array.length) {
    const pop = array.pop();
    if (Array.isArray(pop)) {
      array.push(...pop);
    } else {
      stack.unshift(pop);
    }
  }
  return stack;
}

// 下划线/中划线命名转小驼峰命名
function transform2CamelCase(string) {
  return string.replace(/(_|-)\w/g, (match) => match.slice(1).toUpperCase());
}

// 实现bind
Function.prototype.myBind = function myBind(obj, ...args) {
  const o = obj ?? window;
  const fToBind = this,
    fNOP = function () {};
  Fn = function (...rest) {
    return fToBind.apply(fNOP.prototype.isPrototypeOf(this) ? this : o, [
      ...args,
      ...rest
    ]);
  };
  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }
  Fn.prototype = fNOP.prototype;
  return Fn;
};

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
function createArray(...rest) {
  const arr = [...rest];
  const handler = {
    get(target, index) {
      index = Number(index);
      if (Number.isNaN(index)) return -1;
      if (index < 0) {
        return Reflect.get(target, target.length + index);
      }
      return Reflect.get(target, index);
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

// 手写async/await,其实就是简易co
function asyncFunction(gen) {
  if (typeof gen === 'function') gen = gen();
  if (!gen || typeof gen.next !== 'function')
    throw new TypeError(`${gen.next} is not a function!`);
  return new Promise((resolve, reject) => {
    function step(type, val) {
      let result;
      try {
        result = gen[type](val);
      } catch (error) {
        reject(error);
      }
      const { done, value } = result;
      if (done) resolve(value);
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

// 模板字符串
var o = {
  name: 'jin',
  age: 100
};
var string = "my name is {{name}}, i'm {{age}} years old.";
getString(string, o);
function getString(string, o) {
  return string.replace(/\{\{(.*?)\}\}/g, (match, key) => o[key]);
}

// LRU算法
class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.map = new Map();
  }

  put(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    } else {
      if (this.map.size >= this.limit) {
        this.map.delete([...this.map.keys()][0]);
      }
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
