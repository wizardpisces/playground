const path = require('path')
const fs = require('fs')
const {
    inspect
} = require("util");

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
                    dispatchLogicNeedMarkReferenceCount: 0, // 用于存储 dispatchLogic 引用中需要标记 moduleRunAt 的引用次数
                    dispatchLogicTotalReferenceCount: 0, // 用于存储 dispatchLogic 文件名内部所有引用次数
                    markedModuleRunAtCount: 0, // moduleRunAt 字符串出现次数的映射
                    ratio: 0 // moduleRunAt 的覆盖率，moduleRunAtCount/dispatchLogicNeedMarkReferenceCount
                }

                // if (fs.existsSync('file-content.json')) {
                //     fs.unlinkSync('file-content.json')
                // }

                function collectDispatchLogicData(item) {
                    const currentFilename = item.resource,
                        currentDirname = path.dirname(currentFilename)

                    /**
                     * tree shake will delete unused import content from chunk
                     * 这个方法会丢失被 shake 掉的 content ，导致 moduleRunAt 变少
                     * 换成收集 dispatchLogic 可能的分发引用，然后定点计算 moduleRunAt 的出现次数
                     */
                    // const fileContent = item.originalSource().source();
                    // fs.appendFileSync('file-content.json', currentFilename + '\n' + fileContent + '\n\n')
                    // const regex = /moduleRunAt\(([^)]+)\)/g;
                    // if (fileContent.match(regex)) { // collect moduleRunAt total count
                    //     result.markedModuleRunAtCount++
                    // }


                    // is not dispatchLogic file
                    if (currentFilename.includes("dispatchLogic")) {
                        console.log('module.dependencies', item.dependencies.length)
                        let searchedResource = new Set()
                        let needInspectFiles = []
                        /**
                         * gpt：
                         * 一般来说， dependencies的长度跟import数量是正相关的， 也就是说import数量越多， dependencies长度越大。 但是， 这并不是一个固定的比例， 因为不同的import语句可能会生成不同数量的依赖对象。 例如：

                         如果import语句是动态导入， 比如import('./foo.js')， 那么它会生成一个ImportDependency对象和一个ImportContextDependency对象， 所以dependencies长度会增加2。
                         如果import语句是别名导入， 比如import foo from '@foo'， 那么它会生成一个ImportDependency对象和一个AliasModule对象， 所以dependencies长度会增加2。
                         如果import语句是上下文导入， 比如import(`./${name}.js`)， 那么它会生成一个ImportDependency对象和一个ContextModule对象， 所以dependencies长度会增加2。
                         
                         也就是 dependencies 数量是跟 import 无法匹配的
                         */
                        result.dispatchLogicFileCount++
                        item.dependencies.forEach((dependency, index) => {
                            let module = compilation.moduleGraph.getModule(dependency)
                            // fs.appendFileSync('dependency-info.json', inspect(module))
                            if (!module) { //不存在退出
                                return
                            }

                            let absoluteFilename = module.resource
                            if (searchedResource.has(absoluteFilename)) { // 避免重复遍历（上述说到的，import 数跟 dependencies 会对不上）
                                return
                            }

                            searchedResource.add(absoluteFilename)
                            result.dispatchLogicTotalReferenceCount++

                            if (currentDirname === path.dirname(absoluteFilename)) { // 只对当前目录的分发做统计
                                const filesNeedToBeExcluded = ['util', 'utils', 'type', 'const', 'constant'] // 排除 util 等当前目录下无关分发的引用文件
                                if (!filesNeedToBeExcluded.includes(path.basename(absoluteFilename, path.extname(absoluteFilename)))) {
                                    needInspectFiles.push(absoluteFilename) // 收集实际被分发的文件，做分母，后续对分母引用文件内容做筛选，做分子
                                }
                            }
                        })

                        result.dispatchLogicNeedMarkReferenceCount += needInspectFiles.length
                        needInspectFiles.forEach(absoluteFilePath => { // collect moduleRunAt total count
                            console.log('absoluteFilePath', absoluteFilePath)
                            let fileContent = fs.readFileSync(absoluteFilePath, {
                                encoding: 'utf8'
                            })
                            const regex = /moduleRunAt\(\[([^)]+)\)/g; // 以数组括号 [ 开头，排除掉定义情况
                            if (fileContent.match(regex)) { // collect moduleRunAt total count
                                result.markedModuleRunAtCount++
                            }
                        })


                        // item.dependencies.forEach(dependency => {
                        //     let module = compilation.moduleGraph.getModule(dependency)
                        //     console.log('dependency对象', dependency)
                        // })

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

                    collectDispatchLogicData(item)

                    const source = item.originalSource().source();
                    const regex = /moduleRunAt\(([^)]+)\)/g;

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
                result.ratio = result.markedModuleRunAtCount / result.dispatchLogicNeedMarkReferenceCount * 100 + '%'
                compilation.assets["dispatch-logic-ratio.json"] = {
                    size: () => result.length,
                    source: () => JSON.stringify(result),
                };
                callback();
            }
        );


    }
}