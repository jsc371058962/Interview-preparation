/**
 * 大纲:
 * 1. 5种排序算法, 冒泡排序, 选择排序, 直接插入排序, 归并排序, 快速排序
 * 2. 二分查找
 * 3. 二叉树的(前中后层)遍历, 包括递归和迭代
 * 4. 深度优先遍历(DFS)和广度优先遍历(BFS)
 * 5. Virtual DOM转真实DOM
 * 6. 版本号排序
 */

// 冒泡排序: 时间复杂度: O(n^2); 空间复杂度: O(1); 稳定性: Y; In-place(原地算法)
function bubbleSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}

// 选择排序: 时间复杂度: O(n^2); 空间复杂度: O(1); 稳定性: Y; In-place(原地算法)
function selectSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (array[i] > array[j]) {
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
  return array;
}

// 直接插入排序: 时间复杂度: O(n^2); 空间复杂度: O(1); 稳定性: Y; In-place(原地算法)
function insertSort(array) {
  const length = array.length;
  for (let i = 1; i < length; i++) {
    const loopNumber = array[i];
    let j = i - 1;
    while (j >= 0 && loopNumber > array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = loopNumber;
  }
  return array;
}

// 归并排序: 时间复杂度: O(nlogn); 空间复杂度: O(n); 稳定性: Y; out-place(非原地算法)
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

// 快速排序: 时间复杂度: O(nlogn); 空间复杂度: O(1); 稳定性: N; In-place(原地算法)
function quickSort(array, start = 0, end = array.length - 1) {
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
      [array[i], array[j]] = [array[j], array[i]];
      j++;
    }
  }
  return j - 1;
}

// 二分查找, 预置条件: 升序数组, 时间复杂度: O(logn), 空间复杂度: O(1)
function binarySearch(array, target) {
  const length = array.length;
  let left = 0, right = length - 1;
  while (left <= right) {
    const mid = ~~((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return - 1;
}

// 先序遍历, 迭代
function preorderTraverse(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root.val);
  preorderTraverse(root.left, nodeList);
  preorderTraverse(root.right, nodeList);
  return nodeList;
}
//迭代
function preorderTraverse(root) {
  if (!root) return [];
  const stack = [root], nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return nodeList;
}

// 中序遍历, 递归
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
  let stack = [], nodeList = [], node = root;
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
function postorderTraverse(root, nodeList = []) {
  if (!root) return [];
  postorderTraverse(root.left, nodeList);
  postorderTraverse(root.right, nodeList);
  nodeList.push(node.val);
  return nodeList;
}
//迭代
function postorderTraverse(root) {
  if (!root) return [];
  const stack = [root], nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.unshift(node);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return nodeList;
}

// 层序遍历, 递归
function levelTraverse(root, nodeList = []) {
  if (!root) return [];
  const queue = [];
  if (root.left) queue.push(root.left);
  if (root.right) queue.push(root.right);
  levelTraverse(queue.shift(), nodeList);
  return nodeList;
}
// 迭代
function leveLTraverse(root) {
  if (!root) return [];
  const queue = [root], nodeList = [];
  while (queue.length) {
    const node = queue.shift();
    nodeList.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return nodeList;
}

// 树的深度优先遍历, 递归
function dfs(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root.val);
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
    for (let i = children.length; i >= 0; i--) {
      stack.push(children[i]);
    }
  }
  return nodeList;
}

// 树的广度优先遍历, 迭代
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

// Virtual DOM转换真实DOM
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
function versionsSort(array) {
  return array.sort((a, b) => {
    const arr1 = a.split('.');
    const arr2 = b.split('.');
    let i = 0;
    while (true) {
      let s1 = arr1[i];
      let s2 = arr2[i++];
      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }
      if (s1 === s2) continue;
      return s2 - s1;
    }
  });
}
console.log(versionsSort(arr));

