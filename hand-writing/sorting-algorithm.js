// 1. 冒泡排序
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

// 2. 选择排序
function selectionSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      if (array[i] > array[j]) {
        [array[i], arrayp[j]] = [array[j], array[i]];
      }
    }
  }
  return array;
}

// 3. 直接插入排序
function insertSort(array) {
  const length = array.length;
  for (let i = 1; i < length; i++) {
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

// 4. 归并排序, 关于递归的
function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }
  const middle = ~~(array.length / 2);
  let leftArray = array.slice(0, middle);
  let rightArray = array.slice(middle);
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
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(sortArray));

// 5. 快速排序
function quickSort(array, start = 0, end = array.length - 1) {
  if (end - start < 1) return;
  const pivotIndex = partition(array, start, end);
  quickSort(array, start, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, end);
  return array;
}
function partition(array, start, end) {
  let j = start;
  let pivot = array[end];
  for (let i = start; i < array.length; i++) {
    if (array[i] <= pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      j++;
    }
  }
  return j - 1;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(sortArray));

// 6. 二分查找
function binarySearch(array, target) {
  let left = 0,
    right = array.length - 1;
  while (left <= right) {
    const middle = ~~((left + right) / 2);
    if (array[middle] === target) {
      return middle;
    } else if (array[middle] > target) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 10));

// 二分查找
function binarySearch(array, target) {
  let left = 0,
    right = array.length - 1;
  while (left <= right) {
    let mid = ~~((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 7));

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

// 归并排序, 会用到递归
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
    if (left[0] >= right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(sortArray));

// 快速排序
function quickSort(array, start = 0, end = array.length - 1) {
  if (end - start < 1) return array;
  const pivotIndex = partition(array, start, end);
  quickSort(array, start, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, end);
  return array;
}
function partition(arr, start, end) {
  const pivot = arr[end];
  let j = start;
  for (let i = start; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      [arr[j], arr[i]] = [arr[i], arr[j]];
      j++;
    }
  }
  return j - 1;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(sortArray));

// 快速排序
function quickSort(array, start = 0, end = array.length - 1) {
  if (end - start < 1) return array;
  // 寻找基准值
  const pivotIndex = partition(array, start, end);
  quickSort(array, start, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, end);
  return array;
}
function partition(array, start, end) {
  // 基准值为最后一个
  const length = array.length;
  const pivot = array[end];
  let j = start;
  for (let i = 0; i < length; i++) {
    if (array[i] <= pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      j++;
    }
  }
  return j - 1;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(sortArray));

function quickSort(array, start = 0, end = array.length - 1) {
  if (end - start < 1) return array;
  const pivotIndex = partition(array, start, end);
  quickSort(array, start, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, end);
  return array;
}
function partition(array, start, end) {
  const length = array.length;
  const pivot = array[end];
  let j = start;
  for (let i = start; i < length; i++) {
    if (array[i] <= pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      j++;
    }
  }
  return j - 1;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(sortArray));

// 快速排序
function quickSort(array, start = 0, end = array.length - 1) {
  // 终止条件
  if (end - start < 1) return;
  const pivotIndex = partition(array, start, end);
  quickSort(array, start, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, end);
  return array;
}
function partition(array, start, end) {
  // 定基准
  const pivot = array[end];
  let j = start;
  const length = array.length;
  for (let i = start; i < length; i++) {
    if (array[i] <= pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      j++;
    }
  }
  return j - 1;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(sortArray));

// 归并排序, 递归
function mergeSort(array) {
  if (array.length <= 1) return array;
  const length = array.length;
  const mid = ~~(length / 2);
  const leftArray = array.slice(0, mid);
  const rightArray = array.slice(mid);
  return merge(mergeSort(leftArray), mergeSort(rightArray));
}
function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(sortArray));

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
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(mergeSort(sortArray));

// 二分法查找
function binarySearch(array, target) {
  let left = 0,
    right = array.length - 1;
  while (left <= right) {
    const mid = ~~((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 9));

// 二分法查找
function binarySearch(array, target) {
  let left = 0,
    right = array.length - 1;
  while (left <= right) {
    const mid = ~~((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] >= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// 树的遍历
// 先序遍历, 递归
function prdOrderTraverse(treeNode) {
  if (!treeNode) return;

  console.log(treeNode.val);
  prdOrderTraverse(treeNode.left);
  preOrderTraverse(treeNode.right);
}

// 先序遍历, 迭代, 栈结构
function prdOrderTraverse(treeNode) {
  if (!treeNode) {
    return;
  }
  const stack = [treeNode];
  while (stack.length) {
    const node = stack.shift();
    console.log(node.val);
    if (node.right) stack.unshift(node.right);
    if (node.left) stack.unshift(node.left);
  }
}

// 中序遍历, 递归
function inOrderTraverse(treeNode) {
  if (!treeNode) return;
  inOrderTraverse(treeNode.left);
  console.log(treeNode.val);
  inOrderTraverse(treeNode.right);
}

// 后序遍历, 递归
function backOrderTraverse(treeNode) {
  if (!treeNode) return;
  backOrderTraverse(treeNode.left);
  backOrderTraverse(treeNode.right);
  console.log(treeNode.val);
}

// 层次遍历, 迭代
function levelTraverse(treeNode) {
  const queue = [treeNode];
  while (queue.length) {
    const node = queue.shift();
    console.log(node.val);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
}

// 深度优先遍历DFS和广度优先遍历BFS
{
  /* <div id="root">
    <ul>
        <li>
            <a href="">
                <img src="" alt="">
            </a>
        </li>
        <li>
            <span></span>
        </li>
        <li>
        </li>
    </ul>
    <p></p>
    <button></button>
</div> */
}

// DFS, 递归版本
function dfs(treeNode, nodeList = []) {
  nodeList.push(treeNode);
  const children = treeNode.children;
  for (let i = 0; i < children.length; i++) {
    dfs(children[i], nodeList);
  }
  return nodeList;
}
// DFS, 迭代
function dfs(treeNode) {
  if (!treeNode) return;
  const nodeList = [];
  const stack = [treeNode];
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

// BFS, 迭代版本
function bfs(treeNode) {
  const nodeList = [];
  const queue = [treeNode];
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

// 快速排序
function quickSort(array, start = 0, end = array.length - 1) {
  if (end - start <= 0) return;
  //基准
  const pivotIndex = partition(array, start, end);
  quickSort(array, start, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, end);
  return array;
}
function partition(array, start, end) {
  const length = array.length;
  const pivot = array[end];
  let j = start;
  for (let i = start; i < length; i++) {
    if (array[i] <= pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      j++;
    }
  }
  return j - 1;
}
var sortArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(quickSort(sortArray));

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
    if (left[0] >= right[0]) {
      result.push(right.shift());
    } else {
      result.push(left.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

// 插入排序
function insertSort(array) {
  const length = array.length;
  for (let i = 1; i < length; i++) {
    const loopNumber = array[i];
    let j = i - 1;
    while (j >= 0 && loopNumber <= array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = loopNumber;
  }
  return array;
}

// 二分查找, 有序数组
function binarySearch(array, target) {
  const length = array.length;
  let left = 0,
    right = length - 1;
  while (left <= right) {
    const mid = ~~((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
}

// 二叉树的遍历
// 先序遍历，递归方式
function preOrderTraverse(treeNode) {
  if (!treeNode) return;
  console.log(treeNode.val);
  preOrderTraverse(treeNode.left);
  preOrderTraverse(treeNode.right);
}
// 先序遍历, 迭代方式(栈结构)
function preOrderTraverse(treeNode) {
  if (!treeNode) return;
  const stack = [treeNode];
  while (stack.length) {
    const node = stack.pop();
    console.log(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.right);
  }
}

// 中序遍历, 递归方式
function inOrderTraverse(treeNode) {
  if (!treeNode) return;
  inOrderTraverse(treeNode.left);
  console.log(treeNode.val);
  inOrderTraverse(treeNode.right);
}

// 后序遍历, 递归方式
function backOrderTraverse(treeNode) {
  if (!treeNode) return;
  backOrderTraverse(treeNode.left);
  backOrderTraverse(treeNode.right);
  console.log(treeNode.val);
}

// 层次遍历, 迭代方式(队列)
function levelTraverse(treeNode) {
  if (!treeNode) return;
  const queue = [treeNode];
  while (queue.length) {
    const node = queue.shift();
    console.log(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}


// 冒泡排序
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

// 选择排序
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

// 插入排序
function insertSort(array) {
  const length = array.length;
  for (let i = 0; i < length; i++) {
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

// 归并排序
function mergeSort(array) {
  // 递归终止条件
  if (array.length <= 1) return array;
  const length = array.length;
  const mid = ~~(length / 2);
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
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
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
  const length = array.length;
  const pivot = array[end];
  let j = start;
  for (let i = start; i < length; i++) {
    if (array[i] <= pivot) {
      [array[i], array[j]] = [array[j], array[i]];
      j++;
    }
  }
  return j - 1;
}

// 二分查找, (有序数组)
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
  return -1;
}

// 二叉树的遍历
var tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: {
        val: 8,
      },
      right: {
        val: 9
      }
    },
    right: {
      val: 5,
      left: {
        val: 10,
      },
      right: {
        val: 11
      }
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: {
        val: 12
      }
    },
    right: {
      val: 7
    }
  }
}
// 先序遍历 递归(根->左->右)
function preOrderTraverse(treeNode, array = []) {
  if (!treeNode) return array;
  array.push(treeNode.val);
  preOrderTraverse(treeNode.left, array);
  preOrderTraverse(treeNode.right, array);
  return array;
}
console.log(preOrderTraverse(tree));
// 迭代, 栈
function preOrderTraverse(treeNode, array = []) {
  if (!treeNode) return;
  const stack = [treeNode];
  while (stack.length) {
    const node = stack.pop();
    array.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return array;
}
console.log(preOrderTraverse(tree));

// 中序遍历, 递归(左->根->右)
function inOrderTraverse(treeNode, array = []) {
  if (!treeNode) return array;
  inOrderTraverse(treeNode.left, array);
  array.push(treeNode.val);
  inOrderTraverse(treeNode.right, array);
  return array;
}
// 迭代
function inOrderTraverse1(treeNode, array = []) {
  if (!treeNode) return;
  const stack = [];
  let node = treeNode;
  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      const pop = stack.pop();
      array.push(pop.val);
      if (pop.right) node = pop.right;
    }
  }
  return array;
}

// 后序遍历(左->右->根)
function backOrderTraverse(treeNode, array = []) {
  if (!treeNode) return array;
  backOrderTraverse(treeNode.left, array);
  backOrderTraverse(treeNode.right, array);
  array.push(treeNode);
}
// 迭代
// https://blog.csdn.net/abuanden/article/details/114339521
function backOrderTraverse(treeNode, array = []) {
  if (!treeNode) return;
  const stack = [treeNode];
  while (stack.length) {
    const node = stack.pop();
    array.unshift(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return array;
}

// 层次遍历(迭代)
function levelTraverse(treeNode, array = []) {
  if (!treeNode) return;
  const queue = [treeNode];
  while (queue.length) {
    const node = stack.shift();
    array.push(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return array;
}
// 递归
function levelTraverse(treeNode, array = []) {
  if (!treeNode) return;
  const queue = [];
  array.push(treeNode.val);
  if (treeNode.left) queue.push(treeNode.left);
  if (treeNode.right) queue.push(treeNode.right);
  levelTraverse(queue.shift(), array);
  return array;
}

// 深度优先遍历dfs, 递归
function dfs(treeNode, nodeList = []) {
  if (!treeNode) return;
  nodeList.push(treeNode);
  const children = treeNode.children;
  for (let i = 0; i < children.length; i++) {
    dfs(children[i], nodeList);
  }
  return nodeList;
}
// 深度优先遍历dfs, 迭代    先序遍历
function dfs(treeNode, nodeList = []) {
  if (!treeNode) return;
  const stack = [treeNode];
  while (stack.length) {
    const node = node.pop();
    nodeList.push(node);
    const children = node.children;
    for (let i = children.length - 1; i >= 0; i--) {
      stack.push(children[i]);
    }
  }
  return nodeList;
}

// 广度优先遍历bfs 迭代
function bfs(treeNode, nodeList = []) {
  if (!treeNode) return;
  const queue = [treeNode];
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

// 虚拟dom生成真实dom
var vnode = {
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
};

function _render(vnode) {
  if (typeof vnode === 'number') vnode = String(vnode);
  if (typeof vnode === 'string') return document.createTextNode(vnode);
  const dom = document.createElement(vnode.tag);
  const attrs = vnode.attrs;
  if (attrs) {
    for (const key in attrs) {
      if (Object.hasOwnProperty.call(attrs, key)) {
        const value = attrs[key];
        dom.setAttribute(key, value);
      }
    }
  }
  vnode.children.forEach((child) => {
    dom.appendChild(_render(child));
  });
  return dom;
}

