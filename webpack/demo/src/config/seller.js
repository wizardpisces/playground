// console.log = function (...arg) {
//     console.error(...arg)
//     console.log('side effect: this tampered console.log')
// }

// setTimeout(() => {
//     console.log('timer side effect')
// }, 1000)

// Array.prototype.customFun = ()=>{
//     console.log('side effect: prototype tamper : add customFun to Array.prototype')
// }

// Function.prototype.bind = ()=>{
//     console.log('side effect: bind polyfill, should be eliminated if not used')
// }

// console.warn('unused should not be loaded in env Portal=normal')
import {moduleRunAt} from '../util'

moduleRunAt([{
    portal: ['seller']
}])

export function sellerFn() {
    console.log('sellerFn function running')
}

let fn = sellerFn

export const config = {
    name:'seller liuze',
    // fn,
     fnRes: {
        //  data: fn(),
         other: ''
     }
}