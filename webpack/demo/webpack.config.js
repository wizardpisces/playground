const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

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
        // mode: 'production',
        mode: 'development',

        plugins: [
            new webpack.DefinePlugin({
                'ENV_IS_NORMAL_PORTAL': JSON.stringify(env.PORTAL === 'Normal'),
                'PORTAL': JSON.stringify(env.PORTAL)
                // 'ENV_IS_NORMAL_PORTAL': JSON.stringify(process.env.normalPortal)
            }),
            // new webpack.SourceMapDevToolPlugin({}),
            new HtmlWebpackPlugin({
                template:"index.html"
            }),
            // new webpack.optimize.ModuleConcatenationPlugin(),
            // new webpack.optimize.FlagDependencyUsagePlugin,
            // new webpack.optimize.FlagIncludedChunksPlugin(),
            // new webpack.optimize.TerserPlugin(),
        ],
        optimization: {
            // usedExports:true,
            // concatenateModules: true,
            // minimize: true,
            // nodeEnv:'development',
            // sideEffects:false,
            // minimizer: [new TerserPlugin({
            //     terserOptions:{
            //         compress:{
            //             // pure_funcs: ["checkRuntimeEnv"]
            //             // side_effects:false
            //         }
            //     }
            // })],
        },
    }
};