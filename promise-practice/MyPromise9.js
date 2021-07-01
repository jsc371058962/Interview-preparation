const PENDING = 'pending';
const FULFILLED = 'fullfiled';
const REJECTED = 'rejected';

class MyPromise9 {
  static resolve(param) {
    if (param instanceof MyPromise9) {
      return param;
    }
    return new MyPromise9((resolve, reject) => {
      resolve(param);
    });
  }
  static reject(reason) {
    return new MyPromise9((resolve, reject) => {
      reject(reason);
    });
  }
  constructor(executor) {
    this.status = PENDING;
    this.data = null;
    this.reason = null;

    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    const resolve = (data) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.data = data;

        this.onFulfilledCallback.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        this.onRejectedCallback.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(eror);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new MyPromise9((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.data);
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
    reject(new TypeError('Is the same promise.'));
  }
  if (typeof x === 'object' || typeof x === 'function') {
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
          },
        );
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}
MyPromise9.deferred = function() {
  const result = {};
  result.promise = new MyPromise9((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}
module.exports = MyPromise9;
