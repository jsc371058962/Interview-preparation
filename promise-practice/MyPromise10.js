const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise10 {
  static resolve(param) {
    if (param instanceof MyPromise10) {
      return param;
    }
    return new MyPromise10((resolve, reject) => {
      resolve(param);
    });
  }
  static reject(reason) {
    return MyPromise10((resolve, reject) => {
      reject(reason);
    });
  }
  constructor(executor) {
    this.data = null;
    this.reason = null;
    this.status = PENDING;
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
      reject(error);
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
    const fulCallback = (resolve, reject) => {
      queueMicrotask(() => {
        try {
          const x = onFulfilled(this.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    };
    const rejCallback = (resolve, reject) => {
      queueMicrotask(() => {
        try {
          const x = onRejected(this.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    };
    const promise2 = new MyPromise10((resolve, reject) => {
      if (this.status === FULFILLED) {
        fulCallback(resolve, reject);
      }
      if (this.status === REJECTED) {
        rejCallback(resolve, reject);
      }
      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => {
          fulCallback(resolve, reject);
        });
        this.onRejectedCallback.push(() => {
          rejCallback(resolve, reject);
        });
      }
    });
    return promise2;
  }
}
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(new TypeError('error!'));
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
          }
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

MyPromise10.deferred = function () {
  const result = {};
  result.promise = new MyPromise10((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};
module.exports = MyPromise10;
