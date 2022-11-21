import {
    isNormalPortal
} from "./constant";
import {
    square,
    cube
} from "./math";
import {unusedFunction} from './unused'

let arr = []

arr.customFun()

const func = () => {
    let a = 1
    console.log('asdf')
}

let bFunc = func.bind(arr)

bFunc()

function test(){
    if (isNormalPortal) {
        console.log(cube(2))
        console.log(square(2))
        document.write('is normal portal')
        return
        
    } else {
        // unusedFunction()
        document.write('is not normal portal')
    }
    document.write("won't be called")
}

const fn = ()=>{
    switch (isNormalPortal){
        case true: {
            if (isNormalPortal) {
                console.log(cube(2))
                console.log(square(2))
                return
            }
                console.log('could be tree shaked')
                // unusedFunction()
            break
        }
        case false:{
            console.log('false static logic ,could be shaked');
            break;
        }
        default:console.log(3)
    }
}

fn()