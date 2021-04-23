// gogogogogogogogogoggogogo
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise1 {
  static resolve(param) {
    if (param instanceof MyPromise1) {
      return param;
    }

    return new MyPromise1((resolve) => {
      resolve(param);
    });
  }

  static reject(reason) {
    return new MyPromise1((resolve, reject) => {
      reject(reason);
    });
  }

  constructor(executor) {
    this.status = 'pending'; // 初始状态为pending
    this.data = null; // 初始化data
    this.reason = null; // 初始化reason

    // 构造函数里面添加两个数组存储成功和失败的回调
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    // resolve方法参数是data
    const resolve = (data) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.data = data;

        // resolve里面将所有成功的回调拿出来执行
        this.onFulfilledCallback.forEach((callback) => {
          callback(this.data);
        });
      }
    };

    // reject方法参数是reason
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        // resolve里面将所有失败的回调拿出来执行
        this.onRejectedCallback.forEach((fn) => {
          fn(this.reason);
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 如果onFulfilled不是函数，给一个默认函数，返回value
    // 后面返回新promise的时候也做了onFulfilled的参数检查，这里可以删除，暂时保留是为了跟规范一一对应，看得更直观
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

    const promise1 = new MyPromise1((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.data);
            resolvePromise(promise1, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise1, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      // 如果还是PENDING状态，将回调保存下来
      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.data);
              resolvePromise(promise1, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallback.push(() => {
          queueMicrotask(() => {
            try {
              var x = onRejected(this.reason);
              resolvePromise(promise1, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    return promise1;
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('new error!'));
  }

  if (typeof x === 'function' || typeof x === 'object') {
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      then = x.then;
    } catch (error) {
      return reject(error);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (z) => {
            if (called) return;
            called = true;
            reject(z);
          }
        );
      } catch (error) {
        if (called) return;
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

MyPromise1.deferred = function () {
  let result = {};
  result.promise = new MyPromise1((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

module.exports = MyPromise1;
