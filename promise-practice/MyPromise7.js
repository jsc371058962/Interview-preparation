const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise7 {
  static resolve(param) {
    if (param instanceof MyPromise7) {
      return resolve(param);
    }
    return new MyPromise7((resolve, reject) => {
      resolve(param);
    });
  }

  static reject(error) {
    return new MyPromise7((resolve, reject) => {
      reject(error);
    });
  }

  constructor(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    const resolve = (data) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = data;

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
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise7((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
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
              const x = onFulfilled(this.value);
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

  catch(callback) {
    return this.then(null, (reason) => {
      return callback(reason);
    });
  }

  finally(callback) {
    const P = this.constructor;
    return this.then(
      (value) => P.resolve(callback()).then(() => value),
      (error) => P.resolve(callback()).then(() => { throw error }));
  }

  done() {
    this.catch((error) => {
      setTimeout(() => {
        throw error;
      });
    });
  }

  static all(promises) {
    if (Array.isArray(promises)) {
      throw new TypeError(`${promises} is not iterable!`);
    }
    return new Promise((resolve, reject) => {
      if (!promises.length) resolve([]);
      let count = 0;
      const results = [];
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(
          (data) => {
            results[index] = data;
            count++;
            if (count === promises.length) {
              resolve(results);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  static race(promises) {
    if (Array.isArray(promises)) {
      throw new TypeError(`${promises} is not iterable!`);
    }
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        Promise.resolve(promise).then(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }

  static allSettled(promises) {
    if (Array.isArray(promises)) {
      throw new TypeError(`${promises} is not iterable!`);
    }
    return new Promise((resolve, reject) => {
      let count = 0;
      const results = [];
      promises.forEach((promise, idx) => {
        Promise.resolve(promise).then(
          (value) => {
            results[idx] = { status: 'fulfilled', value };
            count++;
            if ((count = promises.length)) {
              resolve(results);
            }
          },
          (error) => {
            results[idx] = { status: 'rejected', reason: error };
            count++;
            resolve(results);
          }
        );
      });
    });
  }

  static any(promises) {
    if (Array.isArray(promises)) {
      throw new TypeError(`${promises} is not iterable!`);
    }
    return new Promise((resolve, reject) => {
      let count = 0;
      promises.forEach((promise) => {
        Promise.resolve(promise).then(
          (value) => {
            resolve(value);
          },
          () => {
            count++;
            if (count === promises.length) {
              reject(new AggregateError('All promises were rejected'));
            }
          }
        );
      });
    });
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(new TypeError(`Has a cycle referrence!`));
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
      let isCalled = false;
      try {
        then.call(
          x,
          (y) => {
            if (isCalled) return;
            isCalled = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (z) => {
            if (isCalled) return;
            isCalled = true;
            reject(z);
          }
        );
      } catch (error) {
        if (isCalled) return;
        isCalled = false;
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

MyPromise7.deferred = function () {
  const result = {};
  result.promise = new MyPromise7((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

module.exports = MyPromise7;
