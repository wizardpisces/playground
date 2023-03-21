const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");


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
class ModuleRunAtPlugin {
    constructor(options = {
        portal: '',
        region: ''
    }) {
        this.options = JSON.parse(JSON.stringify(options).toLowerCase())
    }
    // Define `apply` as its prototype method which is supplied with compiler as its argument
    apply(compiler) {
        // Specify the event hook to attach to
        compiler.hooks.emit.tapAsync(
            'ModuleRunAtPlugin',
            (compilation, callback) => {

                for (const assetName in compilation.assets) {
                    // Get the asset source code as a string
                    const source = compilation.assets[assetName].source();
                    // Use a regular expression to match moduleRunAt function calls
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
                        if (!moduleRunAt(arg, this.options)) {
                            compilation.errors.push(
                                new Error(
                                    `[moduleRunAt] wrong borders : ${match[1]} in ${assetName} ,env: ${JSON.stringify(this.options)}`
                                )
                            );
                        }
                    }
                }

                callback();
            }
        );


    }
}



class FileListPlugin {
    static defaultOptions = {
        outputFile: 'assets.md',
    };

    // 需要传入自定义插件构造函数的任意选项
    //（这是自定义插件的公开API）
    constructor(options = {}) {
        // 在应用默认选项前，先应用用户指定选项
        // 合并后的选项暴露给插件方法
        // 记得在这里校验所有选项
        this.options = {
            ...FileListPlugin.defaultOptions,
            ...options
        };
    }

    apply(compiler) {
        const pluginName = FileListPlugin.name;

        // webpack 模块实例，可以通过 compiler 对象访问，
        // 这样确保使用的是模块的正确版本
        // （不要直接 require/import webpack）
        const {
            webpack
        } = compiler;

        // Compilation 对象提供了对一些有用常量的访问。
        const {
            Compilation
        } = webpack;

        // RawSource 是其中一种 “源码”("sources") 类型，
        // 用来在 compilation 中表示资源的源码
        const {
            RawSource
        } = webpack.sources;

        // 绑定到 “thisCompilation” 钩子，
        // 以便进一步绑定到 compilation 过程更早期的阶段
        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            // 绑定到资源处理流水线(assets processing pipeline)
            compilation.hooks.processAssets.tap({
                    name: pluginName,

                    // 用某个靠后的资源处理阶段，
                    // 确保所有资源已被插件添加到 compilation
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                (assets) => {
                    // "assets" 是一个包含 compilation 中所有资源(assets)的对象。
                    // 该对象的键是资源的路径，
                    // 值是文件的源码

                    // 遍历所有资源，
                    // 生成 Markdown 文件的内容
                    const content =
                        '# In this build:\n\n' +
                        Object.keys(assets)
                        .map((filename) => `- ${filename}`)
                        .join('\n');

                    // 向 compilation 添加新的资源，
                    // 这样 webpack 就会自动生成并输出到 output 目录
                    compilation.emitAsset(
                        this.options.outputFile,
                        new RawSource(content)
                    );
                }
            );
        });
    }
}

module.exports = (env) => {

    console.log(env.PORTAL)

    return {
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            // compress: true,
            port: 9000,
        },
        entry: './src/index.js',
        // devtool: false,
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        mode: 'production',
        // mode: 'development',

        plugins: [
            new webpack.DefinePlugin({
                'ENV_IS_NORMAL_PORTAL': JSON.stringify(env.PORTAL === 'Normal'),
                'PORTAL': JSON.stringify(env.PORTAL)
                // 'ENV_IS_NORMAL_PORTAL': JSON.stringify(process.env.normalPortal)
            }),
            // new webpack.SourceMapDevToolPlugin({}),
            new HtmlWebpackPlugin({
                template: "index.html"
            }),
            new ModuleRunAtPlugin({
                portal: env.PORTAL
            }),
            new FileListPlugin()
            // new webpack.optimize.ModuleConcatenationPlugin(),
            // new webpack.optimize.FlagDependencyUsagePlugin,
            // new webpack.optimize.FlagIncludedChunksPlugin(),
            // new webpack.optimize.TerserPlugin(),
        ],
        optimization: {
            // usedExports:true,
            // concatenateModules: true,
            minimize: true,
            // nodeEnv:'development',
            // sideEffects:false,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    keep_fnames: /moduleRunAt/,
                    compress: {
                        // dead_code: true,
                        // pure_funcs: ["checkRuntimeEnv"]
                        // side_effects:false
                    }
                }
            })],
        },
    }
};