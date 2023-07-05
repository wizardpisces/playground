let a:NotExist = 1

const ageMap = {
    1:1,
    2:2
}
let error2:number = 2

let error3:TSERROR3 = 2
let error4:TSERROR3 = 2
let error5:TSERROR3 = 2
let error6:TSERROR3 = 2


const fn = (): string =>{
    
    return a
}

let error9 = fn()

const s = ageMap[error2]

// 假设这个文件是 src/test.ts
// 定义一个复杂的类型
type TSERROR = {
    a: string;
    b: number;
    c: boolean;
};
// 定义一个复杂的函数
function TSERROR2(x: TSERROR): TSERROR {
    return {
        a: x.b.toString(),
        b: x.c ? 1 : 0,
        c: x.a.length > 0
    };
}
// 定义一个复杂的变量
let TSERROR3: TSERROR = {
    a: "hello",
    b: 42,
    c: false
};
// 尝试使用这些复杂的东西
console.log(TSERROR2(TSERROR3));
console.log(TSERROR2(TSERROR3).a + TSERROR2(TSERROR3).b);
console.log(TSERROR2(TSERROR3).c ? "true" : "false");
console.log(TSERROR4);

const a = 1;



