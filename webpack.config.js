require('pretty-error').start();

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const Prettier = require("prettier-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const Ocap = require("optimize-css-assets-webpack-plugin");
const HtmlPlugin = require('html-webpack-plugin');

let production = false;

module.exports = {
    mode: production ? "production" : "development",
    entry: "./wsrc/index.js",
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
                loader: ['babel-loader'],
            },
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
            {
                test: /\.(md)$/,
                use: [
                    'html-loader',
                    {
                        loader: 'markdown-loader',
                        options: {
                            highlight: (code, lang) => {
                                if (!lang || ['text', 'literal', 'nohighlight'].includes(lang)) {
                                    return `<pre class="hljs">${code}</pre>`;
                                }
                                const html = highlight.highlight(lang, code).value;
                                return `<span class="hljs">${html}</span>`;
                            },
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./media/dist/library/library.json')
        }),
        new webpack.IgnorePlugin(/^electron$/),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.BannerPlugin(fs.readFileSync(path.join(__dirname, 'LICENSE'), 'utf8')),
        new HtmlPlugin({
            title: 'Mangium',
            hash: true,
            template: "media/html/index.html"
        })
    ],
    devtool: 'source-map',
    optimization: {
        minimize: production,
        minimizer: [new TerserPlugin(), new Ocap()]
    }
}
