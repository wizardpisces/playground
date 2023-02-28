import {
    checkRuntimeEnv
} from './util'

checkRuntimeEnv('Normal','normal module')

export function normalFn(){
    console.log("normalFn function running")
}