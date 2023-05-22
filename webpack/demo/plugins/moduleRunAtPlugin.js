const path = require('path')

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
                // console.log('compilation', compilation.fileDependencies)
                let result = {
                    dispatchLogicFileCount: 0,
                    dispatchLogicNeedMarkReferenceCount:0, // 用于存储 dispatchLogic 引用中需要标记 moduleRunAt 的引用次数
                    dispatchLogicTotalReferenceCount: 0, // 用于存储 dispatchLogic 文件名内部所有引用次数
                    moduleRunAtCount: 0, // moduleRunAt 字符串出现次数的映射
                    ratio: 0 // moduleRunAt 的覆盖率，moduleRunAtCount/dispatchLogicNeedMarkReferenceCount
                }

                function collectDispatchLogicReferenceCount(item) {
                    const currentFilename = item.resource,
                        currentDirname = path.dirname(currentFilename)

                    // is not dispatchLogic file
                    if (currentFilename.includes("dispatchLogic")) {
                        console.log('module.dependencies', item.dependencies.length)
                        const currentTotalImportCount = item.dependencies.length / 2 // 为啥长度是文件内 import 数量的2倍？
                        result.dispatchLogicFileCount++
                        result.dispatchLogicTotalReferenceCount +=currentTotalImportCount
                        item.dependencies.slice(0, currentTotalImportCount).forEach(dependency => { 
                            let absoluteFilename = compilation.moduleGraph.getModule(dependency).resource
                            console.log('absoluteFilename', absoluteFilename)
                            if (currentDirname === path.dirname(absoluteFilename)){ // 只对当前目录的分发做统计（TODO：如何排除 util 等当前目录下无关分发的引用文件）
                                result.dispatchLogicNeedMarkReferenceCount++
                            }
                        })
                        // 定义一个正则表达式，用于匹配 import 语句
                        // const regex = /import\s+[\s\S]*?from\s+['"](.*?)['"]/g;
                        // const matched = resource.match(regex)
                        // const importCount = matched ? matched.length : 0
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
                    if (source.match(regex)) { // collect moduleRunAt total count
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

                // let indexModule = compilation.modules.find(m => m.resource.endsWith('dispatchLogic.js'));
                // let dependencies = indexModule.dependencies;
                // dependencies.forEach(dependency=>{

                //     console.log('dependencies', dependencies.length, compilation.moduleGraph.getModule(dependency).resource)
                // })
                result.ratio = result.moduleRunAtCount / result.dispatchLogicNeedMarkReferenceCount * 100 + '%'
                compilation.assets["dispatch-logic-ratio.json"] = {
                    size: () => result.length,
                    source: () => JSON.stringify(result),
                };
                callback();
            }
        );


    }
}