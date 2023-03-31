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

function isJavascriptModule(item) {
    return /\.(js|mjs|jsx|ts|tsx)$/.test(item.resource);
}

function isNodeModulesModule(item) {
    return !!(item.resource.replace(process.cwd(), '').startsWith('/node_modules'));
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
        let options = this.options
        // Specify the event hook to attach to
        compiler.hooks.emit.tapAsync(
            'ModuleRunAtPlugin',
            (compilation, callback) => {

                function checkModule(item) {
                    // 非js文件或node_modules下的模块不会有检测函数存在，跳过
                    if (!isJavascriptModule(item) || isNodeModulesModule(item)) {
                        return;
                    }
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

                // for (const assetName in compilation.assets) {
                //     // Get the asset source code as a string
                //     const source = compilation.assets[assetName].source();
                //     // Use a regular expression to match moduleRunAt function calls
                //     const regex = /moduleRunAt\(([^)]+)\)/g;
                //     let match;
                //     while ((match = regex.exec(source)) !== null) {
                //         // Get the argument of the function call
                //         let arg
                //         try {
                //             arg = eval(match[1]);
                //         } catch (e) { // ignore unknown arg, eg: function moduleRunAt
                //             continue
                //         }
                //         // Check if the argument meets the build env
                //         if (!moduleRunAt(arg, this.options)) {
                //             compilation.errors.push(
                //                 new Error(
                //                     `[moduleRunAt] wrong borders : ${match[1]} in ${assetName} ,env: ${JSON.stringify(this.options)}`
                //                 )
                //             );
                //         }
                //     }
                // }

                callback();
            }
        );


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