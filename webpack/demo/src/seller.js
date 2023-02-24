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
import {checkRuntimeEnv} from './util'

// if (!ENV_IS_NORMAL_PORTAL) {
checkRuntimeEnv('Seller','seller module')
// }

// document.write('is_normal_portal')
export function sellerFn() {
    console.log('seller function running')
}

export const config = {
    name:'liuze'
}
// export function unusedFunction2(){
//     console.log('unusedFunction2')
// }