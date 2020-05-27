require('pretty-error').start();

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const Prettier = require("prettier-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const Ocap = require("optimize-css-assets-webpack-plugin");
const HtmlPlugin = require('html-webpack-plugin')

let production = false;

module.exports = {
    mode: production ? "production" : "development",
    entry: "./media/js/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'media/dist'),
        publicPath: "/media/",
        library: "Mangium",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
<<<<<<< HEAD
                loader: ['babel-loader'],
=======
                loader: ['babel-loader']
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
            },
            {
                test: /\.s[ac]ss$/,
                loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
<<<<<<< HEAD
                test: /\.css$/,
                loader: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
=======
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
                test: /\.(png|svg|jpg|gif)$/,
                loader: ['url-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: ['file-loader']
            }
        ]
    },
    plugins: [
<<<<<<< HEAD
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
=======
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
        new Prettier({
            trailingComma: 'all',
            semi: false,
        }),
        new webpack.BannerPlugin(fs.readFileSync(path.join(__dirname, 'LICENSE'), 'utf8')),
        new HtmlPlugin({
            title: 'Mangium',
<<<<<<< HEAD
            hash: true,
            template: "media/html/index.html"
=======
            hash: true
>>>>>>> 919e4e5b169cb9ffe8a376d28015e0ce9e1b324c
        })
    ],
    devtool: 'source-map',
    optimization: {
        minimize: production,
        minimizer: [new TerserPlugin(), new Ocap()]
    }
}
