import { isNormalPortal } from "./constant";
import { square,cube } from "./math";
import unusedFunction from './unused'

if(isNormalPortal){
    console.log(cube(2))
    console.log(square(2))
}else{
    unusedFunction()
}