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
 */

// 冒泡排序
function bubbleSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      if (array[j] < array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}

// 选择排序
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

// 直接插入排序
function insertSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const loopNumber = array[i];
    let j = i - 1;
    while (j >= 0 && loopNumber < array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = loopNumber;
  }
  return array;
}

// 归并排序
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

// 快速排序
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

// 二叉树的遍历, 均迭代
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
  return array;
}

// 层序遍历, 递归
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
  const queue = [root], nodeList = [];
  while (queue.length) {
    const node = queue.shift();
    nodeList.push(node.val);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
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
    dfs(children[i], nodeList);
  }
  return nodeList;
}
// 迭代
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

// bfs, 迭代
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

// 虚拟DOM转化
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
  children.forEach((node) => dom.appendChild(_render(node)));
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

// rgb(xxx, xxx, xxx)转换16进制
function transform2Hex(string) {
  const arr = string.match(/\d+/g);
  const toHex = (s) => Number(s).toString(16).padStart('0', 2);
  return arr.reduce((prev, cur) => prev + toHex(cur), '#').toUpperCase();
}

// JS实现一个带并发限制的异步调度器Scheduler
// 保证同时运行的任务数最多有俩个
// 完善代码中Scheduler类
//要求
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

// 栈结构实现flat数组
function flat(array) {
  const stack = [...array];
  const result = [];
  while (stack.length) {
    const pop = stack.pop();
    if (Array.isArray(pop)) {
      stack.push(...pop);
    } else {
      result.unshift(pop);
    }
  }
  return result;
}
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
console.log(flat(arr));

// 下划线/中划线命名转小驼峰命名
function trans2CamelCase(string) {
  return string.replace(/(_|-)\w/g, function (match) {
    return match.slice(1).toUpperCase();
  });
}
console.log(trans2CamelCase('get_name_and_value'));

// 实现bind
Function.prototype.myBind = function myBind(obj, ...args) {
  const o = obj ?? window,
    fToBind = this;
  function f(...rest) {
    return fToBind.apply(this instanceof f ? this : o, [...args, ...rest]);
  }
  if (this.prototype) {
    f.prototype = this.prototype;
  }
  return f;
}
