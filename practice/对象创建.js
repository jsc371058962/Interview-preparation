function indexes(target, nums) {
  let map = new Map();
  let i = -1;
  while (i++ < nums.length) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }
}
indexes(9, [2, 5, 7, 19]);

function getNewArr(arr) {
  function flatten(nums) {
    let arr = [];
    while (nums.some((item) => !Array.isArray(item))) {
      arr = [].concat(...nums);
    }
    return arr;
  }
  function sortArr(a, b) {
    return a - b;
  }
  function unique(nums) {
    return [...new Set(nums)];
  }
  return unique(flatten(arr)).sort(sortArr);
}

// 创建对象
// 工厂模式
/**
 *
 * @param
 * @returns 一个新的对象
 * @缺点 1. 对象是谁的实例，2 对象方法不能复用
 */
function createObject({ name, age, sex }) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.sex = sex;
  o.sayName = function () {
    console.log(this.name)
  }
  return o;
}

// 构造函数模式
/**
 *
 * @param
 * @缺点 虽然是相同的方法，但是每次都需要重新创建，相对不够划算，如果提取出来，
 * 又变化成全局方法，但这个函数只应该被实例对象所使用，结果暴露在全局，污染全局作用域
 */
function Person({ name, age, job }) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  }
}

/**
 * new的作用：
 * 1. 首先创建一个对象o， let o = new Object()；
 * 2. 将o的原型指向构造函数的prototype, Object.setPrototypeOf(o, F);
 * 3. 将构造函数的this指向o,构造自有属性, let result = F.call(o, ...args);
 * 4. 如果返回对象，则返回result，否则返回o， return typeof result === 'object' ? result : o;
 */
var person1 = new Person('Nicholas', 29, 'Software Engineer');

// 原型模式
/**
 * @缺点 1. 没有自有属性，只能使用额外代码自定义
 * 2. 属性和方法所有实例对象共享
 */
function Person() {}
Person.prototype.name = 'Nicholas';
Person.prototype.age = 29;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function() {
console.log(this.name);
};
var person1 = new Person();
person1.sayName();


// 最大收益
function maxPrices(arr) {
  let min = Infinity;
  let max = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    } else if (arr[i] - min > max) {
      max = arr[i] - min;
    }
  }

  return max;
}







