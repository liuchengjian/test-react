const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: 'js/app.js'
    },
    resolve: {
        alias: {
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component'),
            utils: path.resolve(__dirname, 'src/utils'),
            service: path.resolve(__dirname, 'src/service'),
        }
    },
    module: {
        rules: [
            //react(jsx)处理
            {
                test: /\.m?jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            //css文件处理
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            //sass文件处理
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            //图片文件处理
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]',
                        },
                    },
                ],
            },
            //字体图标文件处理
            {
                test: /\.(woff|woff2|eot|svg|ttf|otf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        new ExtractTextPlugin("css/[name].css"),
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        // contentBase: './dist',
        port: 8086,
        historyApiFallback: {
            index: '/dist/index.html'
        },
        proxy: {
            '/manage/': {  //匹配所有以/api/为开头的接口
                // target: 'http://139.9.222.156:8080', //后端服务器地址
                target: 'http://10.114.73.119:8087',
                changeOrigin: true,
                // pathRewrite: { '^/mmall/': '' },  //因为我们项目的接口前面并没有api 所以直接去掉
            },
        },
    },

};
