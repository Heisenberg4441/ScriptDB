const path = require('path');
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new webpack.DefinePlugin({
            BUILD_MODE: JSON.stringify(process.env.BUILD_MODE)
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'index',
        libraryTarget: 'umd',
    },
    target: 'node',
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    }
};
