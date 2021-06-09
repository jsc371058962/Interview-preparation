/**
 * 1. 5种排序算法, 冒泡排序, 选择排序, 直接插入排序, 归并排序, 快速排序
 * 2. 二分查找
 * 3. 二叉树的(前中后层)遍历, 包括递归和迭代
 * 4. 深度优先遍历(DFS)和广度优先遍历(BFS)
 * 5. Virtual DOM转真实DOM
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

// 选择排序: 时间复杂度: O(n^2); 空间复杂度: O(1); 稳定性: N; In-place
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

// 直接插入排序: 时间复杂度: O(n^2); 空间复杂度: O(1); 稳定性: Y; In-place
function insertSort(array) {
  const length = array.length;
  for (let i = 1; i < length; i++) {
    const loopNumber = array[i];
    let j = i -  1;
    while (j >= 0 && loopNumber > array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = loopNumber;
  }
  return array;
}

// 归并排序: 时间复杂度: O(nlogn); 空间复杂度: O(n); 稳定性: Y; Out-place(非原地算法)
function mergeSort(array) {
  if (array.length <= 0) return;
  const mid = ~~(array.length / 2);
  const leftArray = array.slice(0, mid);
  const rightArray = array.slice(mid);
  return merge(mergeSort(leftArray), mergeSort(rightArray));
}
function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] > right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  left.length ? result.push(...left) : result.push(...right);
  return result;
}

// 快速排序: 时间复杂度: O(nlogn), 空间复杂度: O(1), 稳定性: N, In-place
function quickSort(array, start = 0, end = array.length - 1) {
  if (end - start <= 0) return;
  const pivotIndex = partition(array, start, end);
  quickSort(array, start, pivotIndex - 1);
  quickSort(array. pivotIndex + 1, end);
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
    } else if (array[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return - 1;
}

/**
 * 二叉树先序遍历(根->左->右), 使用递归
 * @param {TreeNode} root
 * @param {Array} nodeList
 * @returns Array
 */
function preOrderTraverse(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root.val);
  preOrderTraverse(root.left, nodeList);
  preOrderTraverse(root.right, nodeList);
  return nodeList;
}
// 迭代, 栈结构
function preOrderTraverse(root) {
  if (!root) return [];
  const stack = [root];
  const nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return nodeList;
}

/**
 * 二叉树中序遍历(左->根->右), 递归
 * @param {TreeNode} root
 * @param {Array} nodeList
 * @returns Array
 */
function inOrderTraverse(root, nodeList = []) {
  if (!root) return [];
  inOrderTraverse(root.left, nodeList);
  nodeList.push(root.val);
  inOrderTraverse(root.right, nodeList);
  return nodeList;
}
// 迭代, 栈结构
function inOrderTraverse(root) {
  if (!root) return [];
  let node = root;
  const stack = [], nodeList = [];
  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      const pop = stack.pop();
      nodeList.push(pop.val);
      if (node.right) {
        node = node.right;
      }
    }
  }
  return nodeList;
}

/**
 * 后序遍历(左->右->根), 递归
 * @param {TreeNode} root
 * @param {Array} nodeList
 * @returns Array
 */
function postOrderTraverse(root, nodeList = []) {
  if (!root) return [];
  postOrderTraverse(root.left, nodeList);
  postOrderTraverse(root.right, nodeList);
  nodeList.push(root.val);
  return nodeList;
}
// 迭代, 栈结构
function postOrderTraverse(root) {
  if (!root) return [];
  const stack = [root], nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.unshift(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return nodeList;
}

/**
 * 层次遍历, 递归
 * @param {TreeNode} root
 * @param {Array} nodeList
 * @returns Array
 */
function levelTraverse(root, nodeList = []) {
  if (!root) return [];
  const queue = [];
  nodeList.push(root.val);
  if (node.left) queue.push(node.left);
  if (node.right) queue.push(node.right);
  levelTraverse(queue.shift(), nodeList);
  return nodeList;
}
// 迭代, 队列
function levelTraverse(root) {
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

/**
 * 深度优先遍历, 递归
 * @param {NodeList} root
 * @param {Array} nodeList
 * @returns Array
 */
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
      stack.push(children);
    }
  }
  return nodeList;
}

/**
 * 广度优先遍历, 迭代
 * @param {NodeList} root
 * @param {Array} nodeList
 * @returns Array
 */
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
      if (Object.prototype.hasOwnProperty.call(attrs, key)) {
        const val = attrs[key];
        dom.setAttribute(key, val);
      }
    }
  }
  children.forEach((item) => dom.appendChild(_render(item)));
  return dom;
}

