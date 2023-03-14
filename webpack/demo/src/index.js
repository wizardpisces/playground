import {
    getConfig
} from "./config";
const {fn,fnRes,name} = getConfig()
const {data,other} = fnRes
console.log(fn())
console.log(other,data)
console.log(name)