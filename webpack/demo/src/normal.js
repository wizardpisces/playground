import {
    checkRuntimeEnv
} from './util'

// if (ENV_IS_NORMAL_PORTAL){
let status = checkRuntimeEnv('Normal','normal module')
console.log(status)
// }

export function normalFn(){
    console.log("normalFn function running")
}