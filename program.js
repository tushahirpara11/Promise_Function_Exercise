'use strict';

//1) Wram Up
setTimeout(() => {
  console.log("TIMED OUT!");
}, 300);

//2) Fullfill a Promise.
let promise = new Promise(function (fulfill, reject) {
  setTimeout(() => {
    fulfill("FULFILLED!")
  }, 300);
});

promise.then(function (msg) {
  console.log(msg);
});

//3) Reject a Promise
let promise = new Promise(function (fulfill, reject) {
  setTimeout(() => {
    reject(new Error('REJECTED!'));
  }, 300);
});

promise.then(function () {
  console.log("Success");
}, function (error) {
  onReject(error);
});

function onReject(error) {
  console.log(error.message);
}

//4) To reject or to reject in  promises
let promise = new Promise(function (fulfill, reject) {
  fulfill('I FIRED');
  reject(new Error('I DID NOT FIRE'));
});

promise.then(function (successMsg) {
  console.log(successMsg);
}, function (error) {
  console.log(error.message);
});

//5)Always aschronious
let promise = new Promise(function (fulfill, reject) {
  fulfill('PROMISE VALUE');
});

promise.then(function (successMsg) {
  console.log(successMsg);
}, null);

console.log('MAIN PROGRAM');

// 6) Shortcuts

let promise = Promise.reject(new Error('SECRET VALUE'));
promise.catch(function (err) {
  console.error(err.message);
});

//7) Promise after Prommise
first()
  .then(function (response) {
    return second(response)
  })
  .then(function (response) {
    onFulfilled(response)
  });

function onFulfilled(response) {
  console.log(response)
}

//8) values and promises
function attachTitle(data) {
  return 'DR. ' + data;
}
let promise = new Promise(function (resolve, reject) {
  resolve('MANHATTAN')
}).then(attachTitle).then(console.log);

//9) Thrown and Error
function parsePromised(json) {
  return new Promise(function (fulfill, reject) {
    try {
      fulfill(JSON.parse(json));
    } catch (err) {
      reject(err);
    }
  });
}
function onReject(error) {
  console.log(error.message);
}
parsePromised(process.argv[2]).then(null, onReject);

//10) Important Rule.
function iterate(num) {
  console.log(num);
  return num + 1;
}

function alwaysThrows() {
  throw new Error('OH NOES');
}

function onReject(error) {
  console.log(error.message);
}

Promise.resolve(iterate(1))
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(alwaysThrows)
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .then(iterate)
  .catch(onReject);

//11) Multiple Promises
function all(promise1, promise2) {
  let result = [];
  return new Promise(function (resolve, reject) {
    return promise1.then(function (response) {
      result.push(response);
      return promise2.then(function (response) {
        result.push(response)
        resolve(result);
      });
    });
  });
}

all(getPromise1(), getPromise2()).then(function (response) {
  console.log(response);
});

//12) Fetch JSON
let HTTP = require("q-io/http");
HTTP.read('http://localhost:1337').then(response => JSON.parse(response)).then(console.log);