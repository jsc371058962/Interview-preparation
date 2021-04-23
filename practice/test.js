
var object = {
  id: 1,
  doSomething: function () {
    console.log(this.id);
  },
  get id1() {
    return this.id +=1;
  },
  set id1(val) {
    this.id += val;
  }
}

var anotherObject = {
  name: 'james'
}

Object.setPrototypeOf(anotherObject, object);

console.log(anotherObject.id1)
console.log(anotherObject.id1)
console.log(anotherObject.id1)
anotherObject.id1 = 8;
console.log(anotherObject.id1)

function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}
var p = function () {
  Promise.resolve().then(() => {
    return timeout(red, 3000);
  }).then(() => {
    return timeout(green, 1000);
  }).then(() => {
    return timeout(yellow, 2000);
  }).then(() => {
    return p();
  });
}

// p();


function timeout(fn, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, time);
  });
}

let asyncMethod = async function() {
  while (true) {
    await timeout(red, 3000);
    await timeout(green, 1000);
    await timeout(yellow, 2000);
  }
}
// asyncMethod();


var obj1 = {
  a: 1,
  b: 2
}

var obj2 = {
  c: 3
}

var obj1 = Object.create(obj2, {
  'a': {
    enumerable: true,
    configurable: true,
    value: 1,
    writable: true
  },
  'b': {
    enumerable: true,
    configurable: true,
    value: 2,
    writable: true
  }
});

function timer() {
  setTimeout(() => {
    console.log(12345);
  });
}

function promise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('dddd');
    }, 1000);
  })
}

async function method() {
  var result = await promise();
  console.log(result);
}

method().then(() => {
  timer();
});
