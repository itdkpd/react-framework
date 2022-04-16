const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './build',
        port: 3000,
        https: {
            key: fs.readFileSync(path.join(__dirname, './powershell/domains-certificate-key.pem')),
            cert: fs.readFileSync(path.join(__dirname, './powershell/domains-certificate.pem')),
            ca: fs.readFileSync(path.join(__dirname, './powershell/server.pem'))
        },
        hot: true,
        historyApiFallback: true
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        chunkFilename: 'js/[name].[chunkhash].js',
        clean: true,
        publicPath: '/',
        assetModuleFilename: 'images/[hash][ext][query]'
    },
});