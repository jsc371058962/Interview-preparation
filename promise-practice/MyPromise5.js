const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise5 {
  static resolve(param) {
    if (param instanceof MyPromise5) {
      return param;
    }

    return new MyPromise5((resolve, reject) => {
      resolve(param);
    });
  }

  static reject(reason) {
    return new MyPromise5((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    if (Array.isArray(promises)) {
      throw new TypeError('Object is not iterable!');
    }
    let count = 0;
    const results = [];
    return new MyPromise5((resolve, reject) => {
      if (!promises.length) resolve([]);
      promises.forEach((item, index) => {
        MyPromise5.resolve(item).then(
          (data) => {
            results[index] = data;
            count++;
            if (count === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static race(promises) {
    if (Array.isArray(promises)) {
      throw new TypeError('Object is not array!');
    }
    return new MyPromise5((resolve, reject) => {
      promises.forEach((item) => {
        MyPromise5.resolve(item).then(
          (data) => {
            resolve(data);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static allSettled(promises) {
    if (Array.isArray(promises)) {
      throw new TypeError('Object is not array!');
    }
    const results = [];
    let count = 0;
    return new MyPromise5((resolve, reject) => {
      promises.forEach((item, index) => {
        MyPromise5.resolve(item).then(
          (value) => {
            results[index] = { status: 'fulfilled', value };
            count++;
            if (conut === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            results[index] = { status: 'rejected', reason };
            count++;
            if (count === promises.length) {
              resolve(results);
            }
          }
        );
      });
    });
  }

  static any(promises) {
    if (Array.isArray(promises)) {
      throw new TypeError('Object is not array!');
    }
    let count = 0;
    return new MyPromise5((resolve, reject) => {
      promises.forEach((item) => {
        MyPromise5.resolve(item).then(
          (data) => {
            resolve(data);
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

  constructor(executor) {
    this.data = null;
    this.reason = null;
    this.status = PENDING;

    this.onFulfilledCallback = [];
    this.onRejectedCallack = [];

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

        this.onRejectedCallack.forEach((fn) => {
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
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (data) => data;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise5((resolve, reject) => {
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

        this.onRejectedCallack.push(() => {
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
    return this.then(null, (error) => {
      callback(error);
    });
  }

  finally(callback) {
    return this.then(
      (data) => {
        callback();
        return data;
      },
      (error) => {
        callback();
        return error;
      }
    );
  }

  done() {
    this.catch((error) => {
      setTimeout(() => {
        throw new Error(error);
      });
    });
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('Type error!!!'));
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

MyPromise5.deferred = function () {
  const result = {};
  result.promise = new MyPromise5((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}

module.exports = MyPromise5;
