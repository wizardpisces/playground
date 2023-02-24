// import {
//     isNormalPortal
// } from "./constant";
// import {
//     square,
//     cube
// } from "./math";
import { normalFn } from './normal'
import { sellerFn } from './seller'

// let arr = []

// arr.customFun()

// const func = () => {
//     let a = 1
//     console.log('asdf')
// }

// let bFunc = func.bind(arr)

// bFunc()

function test(){
    if (ENV_IS_NORMAL_PORTAL) {
        // console.log(cube(2))
        // console.log(square(2))
        // document.write('is normal portal')
        // console.log('this is normal portal', ENV_IS_NORMAL_PORTAL)
        normalFn()
        // sellerFn()
        return
        
    } else {
        sellerFn()
        console.log('this is not normal portal')
        return
        // document.write('is not normal portal')
    }
}

test()

// const fn = ()=>{
//     switch (isNormalPortal){
//         case true: {
//             if (isNormalPortal) {
//                 console.log(cube(2))
//                 console.log(square(2))
//                 return
//             }
//                 console.log('could be tree shaked')
//                 // unusedFunction()
//             break
//         }
//         case false:{
//             console.log('false static logic ,could be shaked');
//             break;
//         }
//         default:console.log(3)
//     }
// }

// fn()