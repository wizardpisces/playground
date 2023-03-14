import dispatchLogic from "./dispatchLogic";

// console.log(dispatchLogic.getConfig().fn())
// console.log(dispatchLogic.getConfig().fnRes)
// console.log(dispatchLogic.getConfig().name)

export const getConfig = ()=> dispatchLogic['dispatcher'].getConfig()