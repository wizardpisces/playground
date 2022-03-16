// round1
// function A(name){
//     this.name = name
// }

// let b = {}

// Function.prototype.age = 1

// let a = new A('a')
// let p = A.prototype;
// console.log(a.__proto__===A.prototype,p.__proto__===Object.prototype,A.__proto__===Function.prototype)

// console.log(A.call === Function.prototype.call,A.__proto__ === Function.prototype,A.toString === Function.prototype.__proto__.toString)

// console.log(Array.prototype.__proto__ === Object.prototype,A.toString === Object.prototype.toString,A.toString)

// console.log(A.toString === Function.prototype.toString,a.toString === b.toString,a.toString === a.__proto__.toString)

// console.log(
//   b.toString === b.__proto__.toString,
//   b.toString === Object.prototype.toString,
//   Function.prototype.toString === Object.prototype.toString
// );

// round2
// console.log('script start');

// setTimeout(function () {
//     console.log('setTimeout---0');
// }, 0);

// setTimeout(function () {
//     console.log('setTimeout---200');
//     setTimeout(function () {
//         console.log('inner-setTimeout---0');
//     });
//     Promise.resolve().then(function () {
//         console.log('promise5');
//     });
// }, 200);

// Promise.resolve().then(function () {
//     console.log('promise1');
// }).then(function () {
//     console.log('promise2');
// });
// Promise.resolve().then(function () {
//     console.log('promise3');
// });
// console.log('script end');

// round3

// const hours = 1000 * 60 * 60;
// const days = hours * 24;
// const weeks = days * 7;
// const UNIT_TO_NUM = { hours, days, weeks };

// class Duration {
//   constructor(num, unit) {
//     this.number = num;
//     this.unit = unit;
//   }
//   toNumber() {
//     return UNIT_TO_NUM[this.unit] * this.number;
//   }
//   get ago() {
//     return new Date(Date.now() - this.toNumber());
//   }
//   get later() {
//     return new Date(Date.now() + this.toNumber());
//   }
// }
// Object.keys(UNIT_TO_NUM).forEach(unit => {
//   Object.defineProperty(Number.prototype, unit, {
//     get() {
//       return new Duration(this, unit);
//     }
//   });
// });

// console.log((2).weeks.ago);

// let s = new Set([1, 2])
// for (let i of s) console.log(i);

function fib(n = 1) {
  let n1 = 0,
    n2 = 1,
    temp = n2,
    step = 2;
  if (n === 1) return 0;
  if (n === 2) return 1;
  while (step < n) {
    n1 = n2;
    n2 = temp + n1;
    temp = n2;
    step++;
  }
  console.log(n2);
  return n2;
}

fib(5)