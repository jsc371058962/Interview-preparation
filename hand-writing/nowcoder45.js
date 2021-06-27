/**
 * 1. 查找数组元素位置
 * 2. 数组求和
 * 3. 移除数组中的元素(不改变原数组)
 * 4. 移除数组中的元素(改变原数组)
 * 5. 添加元素(不修改原数组)
 * 6. 删除数组最后一个元素(不修改原数组)
 * 7. 添加元素(不修改原数组)
 * 8. 删除数组第一个元素
 * 9. 数组合并
 * 10. 添加元素
 * 11. 计数
 * 12. 查找重复元素
 * 13. 求二次方
 * 14. 查找元素位置
 * ...
 * 19. 计时器
 * 20. 流程控制
 * ...
 * 24. 使用闭包
 * ...
 * 32. 模块
 */

//1. 查找数组元素位置
function indexOf(arr, item) {
  // 可以用api，但是这应该不是考察初衷吧
  if (!arr.length) return -1;
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    if (item === arr[i]) {
      return i;
    }
  }
  return -1;
}

// 2. 数组求和
function sum(arr) {
  if (!arr.length) return 0;
  // 想考虑是否未NaN,但细想下来其实没区别
  return arr.reduce((prev, cur) => prev + cur, 0);
}

// 3. 移除数组中的元素(不改变原数组)
function remove(arr, item) {
  return arr.filter((val) => item !== val);
}

// 4. 移除数组中的元素(改变原数组)
function removeWithoutCopy(arr, item) {
  while (arr.includes(item)) {
    arr.splice(arr.indexOf(item), 1);
  }
  return arr;
}

// 5. 添加元素(不修改原数组)
function append(arr, item) {
  return arr.concat(item);
}

// 6. 删除数组最后一个元素(不修改原数组)
function truncate(arr) {
  const newArr = [...arr];
  newArr.pop();
  return newArr;
}

// 7. 添加元素
// 描述
// 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组
function prepend(arr, item) {
  const newArr = [...arr];
  newArr.unshift(item);
  return newArr;
}

// 8. 删除数组第一个元素
// 描述
// 删除数组 arr 第一个元素。不要直接修改数组 arr，结果返回新的数组
function curtail(arr) {
  const newArr = [...arr];
  newArr.shift();
  return newArr;
}

// 9. 数组合并
// 描述
// 合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组
function concat(arr1, arr2) {
  return [...arr1, ...arr2];
}

// 10. 添加元素
// 描述
// 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
function insert(arr, item, index) {
  const newArr = [...arr];
  newArr.splice(index, 0, item);
  return newArr;
}

// 11. 计数
// 描述
// 统计数组 arr 中值等于 item 的元素出现的次数
function count(arr, item) {
  const map = new Map();
  let count = 0;
  for (const val of arr) {
    val === item && map.set(item, ++count);
  }
  return map.get(item);
}

// 12. 查找重复元素
// 描述
// 找出数组 arr 中重复出现过的元素（不用考虑返回顺序）
function duplicates(arr) {
  return [
    ...new Set(
      arr.filter((item) => arr.indexOf(item) !== arr.lastIndexOf(item))
    )
  ];
}

// 13. 求二次方
// 描述
// 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
function square(arr) {
  return arr.map((item) => item ** 2);
}

// 14. 查找元素位置
// 描述
// 在数组 arr 中，查找值与 item 相等的元素出现的所有位置
function findAllOccurrences(arr, target) {
  return arr.reduce(
    (prev, cur, index) => (cur === target ? [...prev, index] : prev),
    []
  );
}

// 15. 避免全局变量
// 16. 正确的函数定义
// 17. 正确的使用 parseInt
// 19. 计时器
// 描述
// 实现一个打点计时器，要求
// 1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
// 2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
// 3、第一个数需要立即输出
function count(start, end) {
  let timer = null;
  function setTimer() {
    timer = setTimeout(() => {
      if (start < end) {
        console.log(++start);
        setTimer();
      }
    }, 100);
  }
  console.log(start);
  setTimer();
  function cancel() {
    clearTimeout(timer);
    timer = null;
  }
  return { cancel };
}

// 20. 流程控制
// 实现 fizzBuzz 函数，参数 num 与返回值的关系如下：
// 1、如果 num 能同时被 3 和 5 整除，返回字符串 fizzbuzz
// 2、如果 num 能被 3 整除，返回字符串 fizz
// 3、如果 num 能被 5 整除，返回字符串 buzz
// 4、如果参数为空或者不是 Number 类型，返回 false
// 5、其余情况，返回参数 num
function fizzBuzz(num) {
  const FIZZBUZZ = 'fizzbuzz',
    FIZZ = 'fizz',
    BUZZ = 'buzz';
  if (typeof num !== 'number') return false;
  if (!(num % 3) && !(num % 5)) return FIZZBUZZ;
  if (!(num % 3)) return FIZZ;
  if (!(num % 5)) return BUZZ;
  return num;
}

// 21. 函数传参
// 24. 使用闭包
// 实现函数 makeClosures，调用之后满足如下条件：
// 1、返回一个函数数组 result，长度与 arr 相同
// 2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同
function makeClosures(arr, fn) {
  const result = [];
  arr.forEach((item) => result.push(() => fn(item)));
  return result;
}

// 32. 模块
// 描述
// 完成函数 createModule，调用之后满足如下要求：
// 1、返回一个对象
// 2、对象的 greeting 属性值等于 str1， name 属性值等于 str2
// 3、对象存在一个 sayIt 方法，该方法返回的字符串为 greeting属性值 + ', ' + name属性值
function createModule(str1, str2) {
  return {
    greeting: str1,
    name: str2,
    sayIt() {
      return `${this.greeting}, ${this.name}`;
    }
  };
}

// 35. 二进制转换
// 描述
// 将给定数字转换成二进制字符串。如果字符串长度不足 8 位，则在前面补 0 到满8位。
function convertToBinary(num) {
  // 不支持pasStart
  // return num.toString(2).padStart(8, '0');
  const numArr = num.toString(2).split('');
  for (let i = 0; i < 8 - numArr.length; i++) {
    numArr.unshift('0');
  }
  return numArr.join('');
}
