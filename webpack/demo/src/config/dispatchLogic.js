
import {
    normalFn,
    normalConfig
} from './normal'
import {
    config
} from './seller'

import {
    otherFn
} from './util'
otherFn()
export default {
    ['dispatcher']:{
        getConfig(){
                if (ENV_IS_NORMAL_PORTAL) {
                    return normalConfig
    
                } else{
                    // config.sellerFn()
                    return config
                }
                // return config // why this writing style will not shake checkRuntimeEnv in "./seller"
        }
    }
}
