const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ModuleRunAtPlugin = require('./plugins/moduleRunAtPlugin')
// A webpack plugin that detects if variable A appears twice in the same directory tree
class DetectVariableAPlugin {
    constructor(options) {
        // You can pass some options to this plugin if you want
        this.options = options;
    }

    apply(compiler) {
        // Register a hook to run after the compilation is done
        compiler.hooks.afterCompile.tap("DetectVariableAPlugin", (compilation) => {
            // Get all the modules in the compilation
            const modules = compilation.modules;
            // Create a map to store the paths of the modules that contain variable A
            const pathsMap = new Map();
            // Loop through the modules
            for (const module of modules) {
                // Get the source code of the module
                const source = module._source ? module._source.source() : "";
                // Check if the source code contains variable A
                if (source.includes("var A") || source.includes("let A") || source.includes("const A")) {
                    // Get the path of the module
                    const path = module.resource;
                    // Split the path by slashes
                    const segments = path.split("/");
                    // Loop through the segments from the end to the start
                    for (let i = segments.length - 1; i >= 0; i--) {
                        // Get the current segment
                        const segment = segments[i];
                        // Check if the segment is a directory name
                        if (segment.includes(".")) {
                            // Skip this segment if it is a file name
                            continue;
                        }
                        // Check if the paths map already has this segment as a key
                        if (pathsMap.has(segment)) {
                            // Get the array of paths that contain variable A under this segment
                            const paths = pathsMap.get(segment);
                            // Check if any of the paths is a subdirectory of the current path
                            for (const p of paths) {
                                if (p.startsWith(path)) {
                                    // Report an error if variable A appears twice in the same directory tree
                                    compilation.errors.push(
                                        new Error(`Variable A appears twice in the same directory tree: ${p} and ${path}`)
                                    );
                                    // Break the loop
                                    break;
                                }
                            }
                            // Add the current path to the array of paths under this segment
                            paths.push(path);
                        } else {
                            // Create a new array of paths under this segment and add the current path
                            pathsMap.set(segment, [path]);
                        }
                        // Break the loop
                        break;
                    }
                }
            }
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
            // new DispatchLogicRatioPlugin()
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