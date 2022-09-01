module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
                // loader: "esbuild-loader",
                // options: {
                //     loader: 'ts', // Or 'ts' if you don't need tsx
                //     target: 'es2015'
                // }
            }
        ]
    }
};