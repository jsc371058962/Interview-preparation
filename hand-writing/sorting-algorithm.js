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
  if (end - start < 1) return array;
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
  if (end - start < 1) return array;
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
  if (end - start <= 0) return array;
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
