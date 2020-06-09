/*
 *     Copyright (C) 2020   Floffah
 *
 *     @author Floffah & Mangium Contributors
 *     @link https://github.com/floffah/
 */

const path = require('path');
const webpack = require('webpack');

let production = false;

module.exports = {
    mode: production ? "production" : "development",
    context: process.cwd(),
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.sass', '.css'],
        modules: [__dirname, 'node_modules']
    },
    entry: {
        library: [
            'jquery',
            'axios',
            'async',
            'marked',

            'react',
            'react-dom',

            '@fortawesome/fontawesome-free/js/all.min',
            '@fortawesome/fontawesome-free/css/all.min.css',

            '@babel/runtime/helpers/interopRequireDefault.js',
            '@babel/runtime/helpers/interopRequireWildcard.js',

            'antd',
            'antd/dist/antd.css',
            '@ant-design/icons/lib/components/AntdIcon.js',
        ]
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                loader: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                loader: ['url-loader']
            },
        ],
    },
    devtool: 'source-map',
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './media/dist/library'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: './media/dist/library/[name].json'
        }),
        new webpack.IgnorePlugin(/^electron$/),
    ]
};
