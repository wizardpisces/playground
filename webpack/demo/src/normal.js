import {
    checkRuntimeEnv
} from './util'

// if (ENV_IS_NORMAL_PORTAL){
checkRuntimeEnv('Normal','normal module')
// }

export function normalFn(){
    console.log("normalFn function running")
}