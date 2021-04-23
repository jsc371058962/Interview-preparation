const { timeStamp } = require("console");

function findBigestNumber(nums) {
  return nums.reduce((prev, curr) => {
    return prev - curr >= 0 ? prev : curr;
  });
}

console.log(findBigestNumber([32, 4, 21, 32]));

console.log(Math.max.apply(null, [32, 4, 21, 32]));

console.log(Math.max(...[32, 4, 21, 32]));

console.log(Object.is(NaN, NaN));

const arr = [
  [0, 1],
  [2, 3],
  [4, 5],
];


const Animal = function() {
  this.width = 50;
  this.height = 100;
}

Animal.prototype.action = function() {
  console.log(`${this.width + this.height}`);
}

const an = new Animal();
const anmi = Object.create(an);
console.log(anmi.action());

const Cat = function() {
  Animal.call(this);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.move = function() {
  console.log('我要压死人啦！')
}

const cat = new Cat();
cat.action()
console.log(cat.width)
cat.move()
cat instanceof Cat
console.log(cat instanceof Cat, cat instanceof Animal, cat instanceof Object)
console.log(cat.constructor)
console.log(cat.__proto__ === Cat.prototype)
console.log(Cat.prototype.__proto__ === Animal.prototype)
console.log(Cat.prototype.__proto__.__proto__ === Object.prototype)
console.log(Animal.prototype.__proto__ == Object.prototype)
console.log(Cat.prototype === Cat.prototype)
console.log(Cat.__proto__ === Function.prototype)

function copyObject(obj) {
  return Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  );
}

let obj = {
  a: 1,
  action: function() {

  },
  c: {
    d: {
      e: 4
    }
  }
}
const objCopy = copyObject(obj);

const debounce = function(fn, timeout, immediate = false) {
  let timer = null;
  return function (...rest) {
    if (timer) clearTimeout(timer);

    if (immediate) {
      const isCallNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
      if (isCallNow) fn.call(this, ...rest);
    } else {
      timer = setTimeout(() => {
        fn.call(this, ...rest);
      }, timeout);
    }
  }
}

let items = [1, 2, 3, 4, 5];
let result = [];
const asyncFn = function (item, callback) {
  setTimeout(() => {
    callback(item * 2);
  }, 1000);
};
const finalSum = function (value) {
  const sum = value.reduce((prev, cur) => prev + cur);
  console.log(sum);
  return sum;
}
const serialMethod = function (item) {
  console.log('参数为 ' + item +' , 1秒后返回结果');
  if (item) {
    asyncFn(item, function (param) {
      result.push(param);
      return serialMethod(items.shift());
    })
  } else {
    return finalSum(result);
  }
}
serialMethod(items.shift())

class PromiseMune {
  constructor(fn) {
    this.status = 'pending';
    this.success_data;
    this.fail_reason;
    const resolve = (data) => {
      if (this.status = 'pending') {
        this.status = 'fullfilled';
        this.success_data = data;
      }
    };
    const reject = (data) => {
      if (this.status = 'pending') {
        this.status = 'rejected';
        this.fail_reason = data;
      }
    }
    fn(resolve, reject);
  }

  then(onFulFilled, onRejected) {
    if (this.status === 'fullfilled') {
      onFulFilled(this.success_data);
    } else if (this.status === 'rejected') {
      onRejected(this.fail_reason);
    }
  }
}

new PromiseMune((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
}).then((data) => {
  console.log(data);
});


function test(...params) {
  console.log(params instanceof Array);
}
test('a');


let objThis = {
  id: 'qwe',
  cool: function() {
    console.log(this.id);
  }
}

objThis.cool();




