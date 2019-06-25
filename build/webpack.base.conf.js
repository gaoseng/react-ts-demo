
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


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
        extensions: [ '.tsx', '.ts', '.js', 'json' ]
      },
    module: {
        rules: [
            {
                // enforce: 'pre',
                test: /\.ts(x?)$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            // {
            //     enforce: 'pre',
            //     test: /\.(ts|tsx)?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/
            //   },
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
                test: /\.css$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader"
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
        })
    ],
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
}