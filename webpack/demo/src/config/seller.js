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