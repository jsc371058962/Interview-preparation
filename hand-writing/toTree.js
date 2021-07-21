var arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
];
// 转树, 递归
function toTree(array, pid = 0) {
  function loop(parId) {
    const res = [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (parId === item.pid) {
        item.children = loop(item.id);
        res.push(item);
      }
    }
    return res;
  }
  return loop(pid);
}
toTree(arr, 0);
// 转树，非递归
function toTree(array, pid = 0) {
  const result = [],
    obj = {};
  array.forEach((el) => (obj[el.id] = el));
  for (let i = 0; i < array.length; i++) {
    const parId = array[i].pid;
    if (parId === pid) {
      result.push(array[i]);
      continue;
    }
    if (obj[parId].children) {
      obj[parId].children.push(array[i]);
    } else {
      obj[parId].children = [array[i]];
    }
  }
  return result;
}
toTree(arr, 0);

// 递归
function toTree(array, pid = 0) {
  function loop(parId) {
    const res = [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (parId === item.pid) {
        item.children = loop(item.id);
        res.push(item);
      }
    }
    return res;
  }
  return loop(pid);
}
// 迭代
function toTree(array, pid = 0) {
  const obj = {},
    res = [];
  array.forEach((el) => (obj[el.id] = el));
  for (let i = 0; i < array.length; i++) {
    const parId = array[i].pid;
    if (parId === pid) {
      res.push(array[i]);
      continue;
    }
    if (obj[parId].children) {
      obj[parId].children.push(array[i]);
    } else {
      obj[parId].children = [array[i]];
    }
  }
  return res;
}

// 递归
function toTree(array, pid = 0) {
  function loop(parId) {
    const res = [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (parId === item.pid) {
        item.children = loop(item.id);
        res.push(item);
      }
    }
    return res;
  }
  return loop(pid);
}
// 迭代
function toTree(array, pid = 0) {
  const res = [],
    obj = {};
  array.forEach((el) => (obj[el.id] = el));
  for (let i = 0; i < array.length; i++) {
    const pId = array[i].pid;
    if (pId === pid) {
      res.push(array[i]);
      continue;
    }
    if (obj[pId].children) {
      obj[pId].children.push(array[i]);
    } else {
      obj[pId].children = [array[i]];
    }
  }
  return res;
}

var arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
];
// 递归
function toTree(array, pid = 0) {
  function loop(parId) {
    const res = [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (parId === item.pid) {
        item.children = loop(item.id);
        res.push(item);
      }
    }
    return res;
  }
  return loop(pid);
}
toTree(arr);
// 迭代
function toTree(array, pid = 0) {
  const obj = {},
    res = [];
  array.forEach((el) => (obj[el.id] = el));
  for (let i = 0; i < array.length; i++) {
    const parId = array[i].pid;
    if (parId === pid) {
      res.push(array[i]);
      continue;
    }
    if (obj[parId].children) {
      obj[parId].children.push(array[i]);
    } else {
      obj[parId].children = [array[i]];
    }
  }
  return res;
}

// dfs
// 递归
function dfs(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root);
  const children = nodeList.children;
  for (let i = 0; i < children.length; i++) {
    dfs(children[i], nodeList);
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
    for (let i = children.length; i >= 0; i--) {
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
// 二叉树中序遍历， 迭代
function inOrderTraverse(root) {
  if (!root) return [];
  const stack = [],
    nodeList = [];
  let node = root;
  if (stack.length || node) {
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
// 二叉树后序遍历， 迭代
function postOrderTraverse(root) {
  if (!root) return [];
  const stack = [root],
    nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.unshift(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return nodeList;
}
// 层序遍历
// 递归
function levelOrderTraverse(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root.val);
  const queue = [];
  if (root.left) queue.push(root.left);
  if (root.right) queue.push(root.right);
  levelOrderTraverse(queue.shift(), nodeList);
  return nodeList;
}
// 迭代
function levelOrderTraverse(root) {
  if (!root) return [];
  const queue = [root],
    nodeList = [];
  while (queue.length) {
    const node = queue.shift();
    nodeList.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return nodeList;
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
  const res = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  left.length ? res.push(...left) : res.push(...right);
  return res;
}
// 快速排序
function quickSort(array, start = 0, end = array.length) {
  if (end - start <= 0) return;
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
      [array[i], array[j]] === [array[j], array[i]];
      j++;
    }
  }
  return j - 1;
}
// 冒泡排序
function bubbleSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort(sortArray));
// 优化冒泡排序
function bubbleSort(array) {
  let i = array.length;
  while (i > 0) {
    for (let j = 0; j < i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
    i--;
  }
  return array;
}
// vDOM转真实DOM
function _render(vNode) {
  if (typeof vNode === 'number') {
    vNode = String(vNode);
  }
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode);
  }
  const { tag, attrs, children } = vNode;
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
// 递归
function toTree(array, pid = 0) {
  function loop(parId) {
    const res = [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (parId === item.pid) {
        item.children = loop(item.id);
        res.push(item);
      }
    }
    return res;
  }
  return loop(pid);
}
// 迭代
function torTree(array, pid = 0) {
  const obj = {},
    res = [];
  array.forEach((el) => (obj[el.id] = el));
  for (let i = 0; i < array.length; i++) {
    const parId = array[i].pid;
    if (parId === pid) {
      res.push(array[i]);
      continue;
    }
    if (obj[parId].children) {
      obj[parId].children.push(array[i]);
    } else {
      obj[parId].children = [array[i]];
    }
  }
  return res;
}

// 递归
function toTree(array, pid = 0) {
  function loop(parId) {
    const res = [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (parId === item.pid) {
        item.children = loop(id);
        res.push(item);
      }
    }
    return res;
  }
  return loop(pid);
}
// 迭代
function toTree(array, pid = 0) {
  const res = [],
    obj = {};
  array.forEach((el) => (obj[el.id] = el));
  for (let i = 0; i < array.length; i++) {
    const parId = array[i].pid;
    if (pid === parId) {
      res.push(array[i]);
      continue;
    }
    if (obj[parId].children) {
      obj[parId].children.push(array[i]);
    } else {
      obj[parId].children = [array[i]];
    }
  }
  return res;
}
