export function checkRuntimeEnv(portal, moduleName) {
    console.log(`[checkRuntimeEnv] running in ${PORTAL} , received ${portal}, moduleName:${moduleName}`)
    if (PORTAL !== portal) {
        console.warn(`[checkRuntimeEnv] running in the wrong portal, expect ${portal} , received ${PORTAL}; moduleName:${moduleName}`)
    }
    let a = 1
    let b = a + 1
}