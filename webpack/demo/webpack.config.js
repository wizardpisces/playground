const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {

    console.log(env.PORTAL)

    return {
        entry: './src/index.js',
        devtool: false,
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        // mode: 'production',
        mode: 'development',

        plugins: [
            new webpack.DefinePlugin({
                'ENV_IS_NORMAL_PORTAL': JSON.stringify(env.PORTAL === 'Normal'),
                'isNormalPortal': JSON.stringify(env.PORTAL === 'Normal')
                // 'ENV_IS_NORMAL_PORTAL': JSON.stringify(process.env.normalPortal)
            }),
            new webpack.SourceMapDevToolPlugin({})
            // new webpack.optimize.ModuleConcatenationPlugin(),
            // new webpack.optimize.FlagDependencyUsagePlugin,
            // new webpack.optimize.FlagIncludedChunksPlugin(),
            // new webpack.optimize.TerserPlugin(),
        ],
        optimization: {
            // usedExports:true,
            concatenateModules: true,
            minimize: true,
            // nodeEnv:'development',
            // sideEffects:false,
            // // minimize: true,
            // minimizer: [new TerserPlugin()],
        },
    }
};