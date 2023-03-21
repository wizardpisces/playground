import {
    moduleRunAt
} from '../util'

moduleRunAt([{
    portal: ['normal']
}])

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