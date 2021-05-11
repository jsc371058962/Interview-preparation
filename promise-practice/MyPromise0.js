
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  static resolve(param) {
    if (param instanceof MyPromise) {
      return param;
    }
    return new MyPromise((resolve) => {
      resolve(param);
    })
  }

  static reject(err) {
    return new MyPromise((resolve, reject) => {
      reject(err);
    });
  }

  constructor(executor) {
    this.status = 'pending';
    this.reason = null;
    this.data = null;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    // 定义resolve和reject方法
    const resolve = (data) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.data = data;

        this.onFulfilledCallback.forEach((fn) => {
          fn(this.data);
        });
      }

    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        this.onRejectedCallback.forEach((fn) => {
          fn(this.reason);
        });
      }
    };
    // 传入resolve和reject方法
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    // version: 2
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            // 获取成功调用的结果
            const x = onFulfilled(this.data);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.data);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallback.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    return promise2;
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      return resolve(null);
    }

    let then;
    try {
      // 看x是否有thenable或者是Promise实例
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

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

module.exports = MyPromise;

