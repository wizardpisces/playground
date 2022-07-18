const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {

    console.log(env.PORTAL)

    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        mode: 'production',

        plugins: [
            new webpack.DefinePlugin({
                'ENV_IS_NORMAL_PORTAL': JSON.stringify(env.PORTAL === 'Normal')
                // 'ENV_IS_NORMAL_PORTAL': JSON.stringify(process.env.normalPortal)
            })
        ],
        optimization: {
            // minimize: false,
            // sideEffects:true
            // minimize: true,
            // minimizer: [new TerserPlugin()],
        },
    }
};