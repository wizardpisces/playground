// import {
//     isNormalPortal
// } from "./constant";
// import {
//     square,
//     cube
// } from "./math";
import {
    normalFn,
    normalConfig
} from './normal'
import {
    config
} from './seller'

export default {
    ['dispatcher']:{
        getConfig(){
                // let normal = normalFn()
                // let seller = sellerFn()
                if (ENV_IS_NORMAL_PORTAL) {
                    // normalFn()
                    return normalConfig
                    // console.log(normal)
                    // return
    
                } else if(ENV_IS_SELLER_PORTAL) {
                    // config.sellerFn()
                    return config
                    // console.log('this is not normal portal', seller)
                    // document.write('is not normal portal')
                    // return
                }
    
    
                return config // why this writing style will not shake checkRuntimeEnv in "./seller"
        }
    }
}

// let arr = []

// arr.customFun()

// const func = () => {
//     let a = 1
//     console.log('asdf')
// }

// let bFunc = func.bind(arr)

// bFunc()

function test(){
    // let normal = normalFn()
    // let seller = sellerFn()
    if (ENV_IS_NORMAL_PORTAL) {
        normalFn()
        return {}
        // console.log(normal)
        // return
        
    } else {
        // config.sellerFn()
        return config
        // console.log('this is not normal portal', seller)
        // document.write('is not normal portal')
        // return
    }
    
    // return sellerFn() // why this writing style will not shake checkRuntimeEnv in "./seller"
}

// let res = test()

// console.log(res)

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