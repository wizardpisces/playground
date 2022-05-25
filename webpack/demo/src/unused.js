console.log = function (...arg) {
    console.error(...arg)
}

setTimeout(() => {
    console.log('side effect')
}, 1000)

export default function unusedFunction() {
    console.log('this is unusedFunction, should be dead code eliminated')
}