"use strict";
let a = 1;
const ageMap = {
    1: 1,
    2: 2
};
let error2 = 2;
let error3 = 2;
let error4 = 2;
let error5 = 2;
let error6 = 2;
const fn = () => {
    return a;
};
let error9 = fn();
const s = ageMap[error2];
// 定义一个复杂的函数
function TSERROR2(x) {
    return {
        a: x.b.toString(),
        b: x.c ? 1 : 0,
        c: x.a.length > 0
    };
}
// 定义一个复杂的变量
let TSERROR3 = {
    a: "hello",
    b: 42,
    c: false
};
// 尝试使用这些复杂的东西
console.log(TSERROR2(TSERROR3));
console.log(TSERROR2(TSERROR3).a + TSERROR2(TSERROR3).b);
console.log(TSERROR2(TSERROR3).c ? "true" : "false");
console.log(TSERROR4);
