const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "index.html",
});

const copyPlugin = new CopyPlugin({
    patterns: [
      { from: "public/robots.txt", to: "robots.txt" },
      { from: "public/favicon.ico", to: "favicon.ico" },
      { from: "public/manifest.json", to: "manifest.json" },
    ],
})

const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[id].[contenthash].css',
})

const jqueryPlugin = new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
})

const webpackObfuscator = new WebpackObfuscator ({
    rotateStringArray: true
}, [])

const esLintPlugin = new ESLintPlugin();

module.exports = {
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'loader',
        },
        loader: 'lodash',
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                // use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.js$/,
                exclude: [ 
                    path.resolve(__dirname, '') 
                ],
                enforce: 'post',
                use: { 
                    loader: WebpackObfuscator.loader, 
                    options: {
                        rotateStringArray: true
                    }
                }
            }
        ]
    },
    plugins: [htmlPlugin, copyPlugin, miniCssExtractPlugin, jqueryPlugin, esLintPlugin],
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
              },
            },
        },
    },
};