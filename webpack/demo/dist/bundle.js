/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/constant.js
const isNormalPortal = true

console.log('isNormalPortal',true)
;// CONCATENATED MODULE: ./src/math.js
function square(x) {
    return x * x;
}

function cube(x) {
    return x * x * x;
}
;// CONCATENATED MODULE: ./src/unused.js
console.log = function (...arg) {
    console.error(...arg)
    console.log('side effect: this tampered console.log')
}

setTimeout(() => {
    console.log('timer side effect')
}, 1000)

Array.prototype.customFun = ()=>{
    console.log('side effect: prototype tamper : add customFun to Array.prototype')
}

Function.prototype.bind = ()=>{
    console.log('side effect: bind polyfill, should be eliminated if not used')
}

function unusedFunction() {
    console.log('this is unusedFunction, should be dead code eliminated')
}
;// CONCATENATED MODULE: ./src/index.js




let arr = []

arr.customFun()

const func = () => {
    let a = 1
    console.log('asdf')
}

let bFunc = func.bind(arr)

bFunc()

if (isNormalPortal) {
    console.log(cube(2))
    console.log(square(2))
} else {
    // unusedFunction()
}
/******/ })()
;