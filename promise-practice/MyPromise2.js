const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise2 {
  static resolve(params) {
    if (params instanceof MyPromise2) {
      return params;
    }
    return new MyPromise2((resolve) => {
      resolve(params);
    });
  }

  static reject(reason) {
    return new MyPromise2((resolve, reject) => {
      reject(reason);
    });
  }

  constructor(executor) {
    this.data = null;
    this.reason = null;
    this.status = 'pending';

    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

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
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

    // 返回一个promise
    const promise1 = new MyPromise2((resolve, reject) => {
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
              const x = onRejected(this.reason);
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
    reject(new TypeError('new error!'));
  }

  if (typeof x === 'function' || typeof x === 'object') {
    if (x === null) {
      resolve(x);
    }

    let then;
    try {
      then = x.then;
    } catch (error) {
      reject(error);
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
        )
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

MyPromise2.deferred = function () {
  const result = {};
  result.promise = new MyPromise2((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

module.exports = MyPromise2;

