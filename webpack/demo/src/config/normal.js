import {
    checkRuntimeEnv
} from '../util'

checkRuntimeEnv('Normal','normal module')

export function normalFn(){
    console.log("normalFn function running")
}

let fn = normalFn

export const normalConfig = {
    name: 'normal liuze',
    fn:fn,
    fnRes: {
        data: fn(),
        other:''
    }
}