const isInvalidModuleBorder = (border, options) => {
    const {
        portal = [], regions = []
    } = border;
    let isInvalidPortal = false;
    let isInvalidRegion = false;
    if (portal.length) {
        isInvalidPortal = !portal.includes(options.portal);
    }
    if (regions.length) {
        isInvalidRegion = !regions.includes(options.region);
    }
    return isInvalidPortal || isInvalidRegion;
};

function moduleRunAt(borders, options) {
    const isInvalid = borders.some((border) => isInvalidModuleBorder(border, options));
    if (isInvalid) {
        console.error(`[moduleRunAt] running in the wrong border, expect ${JSON.stringify(borders)} , received ${JSON.stringify(options)}`)
        return false
    }
    return true
}

function isJavascriptModule(item) {
    return /\.(js|mjs|jsx|ts|tsx)$/.test(item.resource);
}

function isNodeModulesModule(item) {
    return !!(item.resource.replace(process.cwd(), '').startsWith('/node_modules'));
}

module.exports = class ModuleRunAtPlugin {
    constructor(options = {
        portal: '',
        region: ''
    }) {
        this.options = JSON.parse(JSON.stringify(options).toLowerCase())
    }
    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {
        let options = this.options
        // Specify the event hook to attach to
        compiler.hooks.emit.tapAsync(
            'ModuleRunAtPlugin',
            (compilation, callback) => {
                
                let result = {
                    dispatchLogicFileCount:0,
                    dispatchLogicReferenceCount: 0, // 用于存储 dispatchLogic 文件名内部引用次数
                    moduleRunAtCount: 0 // 定义一个空对象， moduleRunAt 字符串出现次数的映射
                }

                function collectDispatchLogicReferenceCount(item) {
                    const filename = item.resource,
                        resource = item.originalSource().source()
                    // is not dispatchLogic file
                    if (filename.includes("dispatchLogic")) {
                        // 定义一个正则表达式，用于匹配 import 语句
                        // const regex = /import\s+.*?\s+from\s+['"].*?['"]/g;
                        const regex = /import/g;
                        const importCount = resource.match(regex) ? resource.match(regex).length : 0
                        // console.log('item', item.resource,item)
                        result.dispatchLogicFileCount ++
                        // result.dispatchLogicReferenceCount += item.dependencies.length
                        result.dispatchLogicReferenceCount += importCount
                    }
                }

                function checkModule(item) {
                    // 非js文件或node_modules下的模块不会有检测函数存在，跳过
                    if (!isJavascriptModule(item) || isNodeModulesModule(item)) {
                        return;
                    }

                    collectDispatchLogicReferenceCount(item)
                    
                    const source = item.originalSource().source();
                    const regex = /moduleRunAt\(([^)]+)\)/g;
                    if(source.match(regex)){ // collect moduleRunAt total count
                        result.moduleRunAtCount++
                    }
                    let match;
                    while ((match = regex.exec(source)) !== null) {
                        // Get the argument of the function call
                        let arg
                        try {
                            arg = eval(match[1]);
                        } catch (e) { // ignore unknown arg, eg: function moduleRunAt
                            continue
                        }
                        // Check if the argument meets the build env
                        if (!moduleRunAt(arg, options)) {
                            compilation.errors.push(
                                new Error(
                                    `[moduleRunAt] wrong borders : ${match[1]} in ${item.resource} ,env: ${JSON.stringify(options)}`
                                )
                            );
                        }
                    }
                }

                function checkModules(item) {
                    if (item.modules && item.modules.length) {
                        item.modules.forEach(moduleItem => checkModules(moduleItem));
                    }
                    checkModule(item);
                }

                compilation.chunks.forEach((chunk) => {
                    chunk.getModules().forEach(item => checkModules(item));

                });

                compilation.assets["dispatch-logic-ratio.json"] = {
                    size: () => result.length,
                    source: () => JSON.stringify(result),
                };
                callback();
            }
        );


    }
}