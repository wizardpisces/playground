export function moduleRunAt(border) {
    console.log(`[moduleRunAt] running in ${PORTAL} , received ${border.portal}`)
    if (border.portal && border.portal.length>0 && !border.portal.includes(PORTAL)) {
        console.warn(`[moduleRunAt] running in the wrong portal, expect ${border.portal} , received ${PORTAL}`)
        // throw new Error(`[moduleRunAt] running in the wrong portal, expect ${border.portal} , received ${PORTAL}`)
        return false
    }
    return true
}