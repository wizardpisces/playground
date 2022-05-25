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

export default function unusedFunction() {
    console.log('this is unusedFunction, should be dead code eliminated')
}