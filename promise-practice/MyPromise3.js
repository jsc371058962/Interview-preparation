const PENDING = 'pending';
const FULFILLED = 'fulFilled';
const REJECTED = 'rejected';

class MyPromise3 {
  static resolve(param) {
    if (param instanceof MyPromise3) {
      return param;
    }

    return new MyPromise3((resolve, reject) => {
      resolve(param);
    });
  }

  static reject(reason) {
    return new MyPromise3((resolve, reject) => {
      reject(reason);
    });
  }

  constructor(executor) {
    this.status = 'pending';
    this.data = null;
    this.reason = null;

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
    };


    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

    const promise1 = new MyPromise3((resolve, reject) => {
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
        })
      }
    });
    return promise1;
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('同一个promise！'));
  }

  if (typeof x === 'object' || typeof x === 'function') {
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

MyPromise3.deferred = function () {
  const result = {};
  result.promise = new MyPromise3((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}

module.exports = MyPromise3;
