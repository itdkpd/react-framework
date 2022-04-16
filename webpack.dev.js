const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        port: 3000,
        http2: true,
        https: {
            key: fs.readFileSync(path.join(__dirname, './powershell/domains-certificate-key.pem')),
            cert: fs.readFileSync(path.join(__dirname, './powershell/domains-certificate.pem')),
            ca: fs.readFileSync(path.join(__dirname, './powershell/server.pem'))
        },
        hot: true,
        historyApiFallback: true,
        compress: true,
        client: {
            overlay: true,
        }
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: 'js/[name].[chunkhash].js',
        clean: true,
        publicPath: '/',
        assetModuleFilename: 'images/[hash][ext][query]'
    },
});