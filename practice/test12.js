function deepClone(obj) {
  // null, nudefined直接返回
  if (obj == null) {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // 基本类型
  if (typeof obj !== 'object') {
    return obj;
  }
  const o = new obj.constructor;
  // for (const key in obj) {
  //   // 没有当symbol属性时的值
  //   if (obj.hasOwnProperty(key)) {
  //     const element = obj[key];
  //     o[key] = typeof element === 'object' ? deepClone(element) : element;
  //   }
  // }
  for (const key of Reflect.ownKeys(obj)) {
    const element = obj[key];
    o[key] = typeof element === 'object' ? deepClone(element) : element;
  }
  return o;
}

var obj10 = {
  a: '100',
  b: undefined,
  c: null,
  d: Symbol(2),
  e: /^\d+$/,
  f: new Date,
  g: true,
  arr: [10,20,30],
  school:{
    name: 'cherry',
  },
  2: 1234,
  [Symbol()]: 123,
  fn: function fn() {
    console.log('fn');
  }
}
console.log(deepClone(obj10));

Array.prototype.myForEach = function (callback) {
  this.reduce((pre, cur, index) => {
    callback(cur, index, this);
  }, 0);
}
[1, 2, 3].myForEach((value, index) => {
  console.log(value, index);
});

// 累加函数sum(1,2,3)(2).sumOf()
function sum(...params) {
  let total = compute(...params);
  function compute(...rest) {
    let sum1 = 0;
    for (const i of rest) {
      sum1 += i;
    }
    return sum1;
  }
  function fn(...params) {
    total += compute(...params);
    return fn;
  }
  fn.sumOf = function () {
    return total;
  }
  return fn;
}
sum(1,2,3)(2).sumOf();

// 最大公约数
function getGcd(a, b) {
  const [max, min] = [Math.max(a, b), Math.min(a, b)];
  if (max%min === 0) {
    return min;
  } else {
    return getGcd(max%min, min);
  }
}
getGcd(50, 53);

// 扁平数组的一种方法
var arr = [1, 2, [3, [4, 5]], 2];
function flat(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }

  return arr;
}
flat(arr)

// 大数相加(可用最新的BigInt)
function getBigNumberSum(x, y) {
  if (typeof x === 'number') {
    x = x.toString();
  }
  if (typeof y === 'number') {
    y = y.toString();
  }
  const maxLength = Math.max(x.length, y.length);
  x = x.padStart(maxLength, '0');
  y = y.padStart(maxLength, '0');

  let sum = '';
  // 进位
  let t = 0;
  for (let i = maxLength - 1; i >= 0; i--) {
    let temp = Number(x[i]) + Number(y[i]) + t;
    let f = temp%10;
    sum = f + sum;
    t = temp > 10 ? 1 : 0;
  }
  if (t === 1) {
    sum = 1 + sum;
  }
  return sum;
}


