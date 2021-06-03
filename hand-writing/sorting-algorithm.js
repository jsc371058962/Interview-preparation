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
var sortArray = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
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
var sortArray = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(quickSort(sortArray));

// 6. 二分查找
function binarySearch(array, target) {
  let left = 0, right = array.length - 1;
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
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9,]), 3);
