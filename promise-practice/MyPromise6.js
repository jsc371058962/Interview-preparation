const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise6 {
  static resolve(data) {
    if (data instanceof MyPromise) {
      return data;
    }

    return new MyPromise6((resolve, reject) => {
      resolve(data);
    });
  }

  static reject(reason) {
    return new MyPromise6((resolve, reject) => {
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

    const promise2 = new MyPromise6((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.data);
            resolvePromises(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromises(promise2, x, resolve, reject);
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
              resolvePromises(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallback.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromises(promise2, x, resolve, reject);
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

MyPromise6.deferred = function () {
  const result = {};
  result.promise = new MyPromise6((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}

function resolvePromises(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('Is the same promise!'));
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
            resolvePromises(promise, y, resolve, reject);
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

module.exports = MyPromise6;
