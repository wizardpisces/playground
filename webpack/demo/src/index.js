import {
    isNormalPortal
} from "./constant";
import {
    square,
    cube
} from "./math";
import unusedFunction from './unused'

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