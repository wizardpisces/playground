// 导入 webpack 插件的基类
const {
    Compiler
} = require("webpack");

// 定义插件的名称
const PLUGIN_NAME = "DispatchLogicRatioPlugin";

// 定义插件的类
class DispatchLogicRatioPlugin {
    // 构造函数，可以接收一些选项参数
    constructor(options) {
        // 保存选项参数到实例属性中
        this.options = options;
    }

    // 定义 apply 方法，接收一个 compiler 参数，表示 webpack 的编译器实例
    apply(compiler) {
        // 监听 compiler 的 emit 钩子，该钩子在生成资源到 output 目录之前执行
        compiler.hooks.emit.tapAsync(PLUGIN_NAME, (compilation, callback) => {
            // 获取 compilation 中的所有模块
            const modules = compilation.modules;
            let result = []
            // 用于存储 dispatchLogic 文件名内部引用次数
            let dispatchLogicReferenceCount = 0;
            // 定义一个空对象，用于存储引用文件名和 moduleRunAt 字符串出现次数的映射
            let moduleRunAtCount = 0;
            // 遍历所有模块
            for (const module of modules) {
                // 获取模块的资源路径
                const resource = module.resource;
                // 判断资源路径是否以 dispatchLogic. 开头，如果是，则表示是一个 dispatchLogic 文件
                if (resource && resource.startsWith("dispatchLogic.")) {
                    // 获取模块的依赖数组
                    const dependencies = module.dependencies;
                    // 遍历依赖数组
                    for (const dependency of dependencies) {
                        // 获取依赖模块的资源路径
                        const depResource = dependency.module.resource;
                        // 判断依赖模块是否存在，并且不是 node_modules 中的模块
                        if (depResource && !depResource.includes("node_modules")) {
                            dispatchLogicReferenceCount++;
                        }
                    }
                }
            }
            // 遍历所有生成的资源文件
            for (const filename in compilation.assets) {
                // 获取资源文件的内容
                const source = compilation.assets[filename].source();
                // 判断资源文件是否是引用了 dispatchLogic 文件的文件，如果是，则计算其中出现 moduleRunAt 字符串的次数，并更新到 moduleRunAtMap 中
                if (source.match(/moduleRunAt/g)) {
                    moduleRunAtCount++
                }

            }


            // 计算该 dispatchLogic 文件被引用的文件中出现 moduleRunAt 的平均次数，即除以引用次数得到比例，并保留两位小数
            const ratio =
                Math.round((moduleRunAtCount / dispatchLogicReferenceCount) * 100) / 100;
            result = [{
                dispatchLogicReferenceCount
            }, {
                moduleRunAtCount
            }, {
                ratio
            }, {
                modules
            }, {
                assets: compilation.assets
            }]

            compilation.assets["dispatch-logic-ratio.json"] = {
                size: () => result.length,
                source: () => JSON.stringify(result),
            };
            callback(); // 调用回调函数，表示插件执行结束
        });
    }
}

// 导出插件类，供外部使用
module.exports = DispatchLogicRatioPlugin;