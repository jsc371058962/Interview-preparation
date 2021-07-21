/**
 * 大纲:
 * 1. 5种排序算法, 冒泡排序, 选择排序, 直接插入排序, 归并排序, 快速排序
 * 2. 二分查找
 * 3. 二叉树的(前中后层)遍历, 包括递归和迭代
 * 4. 深度优先遍历(DFS)和广度优先遍历(BFS)
 * 5. Virtual DOM转真实DOM
 * 6. 版本号排序
 */

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

// 选择排序
function selectionSort(array) {
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

// 直接插入排序
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

// 归并排序
function mergeSort(array) {
  if (array.length <= 1) return array;
  const mid = ~~array.length / 2;
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

// 二分查找
function binarySearch(array, target) {
  let left = 0,
    right = array - 1;
  while (left <= right) {
    const mid = ~~(left + right) / 2;
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// 二叉树
// 先序遍历,迭代
function prdorderTraverse(root) {
  if (!root) return [];
  const stack = [root],
    nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return nodeList;
}

// 中序遍历,迭代
function inorderTraverse(root) {
  if (!root) return [];
  const nodeList = [],
    stack = [];
  let node = root;
  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      const pop = stack.pop();
      nodeList.push(pop.val);
      if (pop.right) {
        stack.push(node.right);
      }
    }
  }
  return nodeList;
}

// 后序遍历
function postorderTraverse(root) {
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
function levelTraverse(root, nodeList = []) {
  if (!root) return [];
  nodeList.push(root.val);
  const queue = [];
  if (root.left) queue.push(root.left);
  if (root.right) queue.push(root.right);
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
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return nodeList;
}

// 树的遍历
// 深度优先遍历, dfs, 递归
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
  const stack = [root],
    nodeList = [];
  while (stack.length) {
    const node = stack.pop();
    nodeList.push(node);
    const children = root.children;
    for (let i = children - 1; i >= 0; i--) {
      stack.push(children[i]);
    }
  }
  return nodeList;
}

//广度优先遍历
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
