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

//4) To reject or Not to reject in promises.
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
console.log('MAIN PROGRAM');
let promise = new Promise(function (fulfill, reject) {  
  fulfill('PROMISE VALUE');
});
promise.then(function (successMsg) {
  console.log(successMsg);
}, null);