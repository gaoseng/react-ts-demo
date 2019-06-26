
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const utils = require('./utils');

function resolve(dir) {
    return path.join(__dirname, '..', dir); 
}


module.exports = {
    context: path.resolve(__dirname , '../'),
    
    entry: ["@babel/polyfill", "./src/main.tsx"],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', 'json' ],
        alias: {
            '@': resolve('src'),
        }
      },
    module: {
        rules: [
            {
                // enforce: 'pre',
                test: /\.ts(x?)$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(s?)css$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        
    ],
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
}