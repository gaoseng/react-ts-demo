const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["@babel/polyfill", "./src/main.tsx"],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bandle.js'
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
      },
      mode: 'development',
      devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                    }
                ]
            }
        ]
    },
    //npm install --save-dev webpack-dev-server
    devServer: {
        //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
      contentBase: path.resolve(__dirname, "dist"),
      compress:true, //是否压缩
      port:3000, //端口号
    //   host:'0.0.0.0', //外部服务器可以访问
    //   open:true //是否运行时打开浏览器
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
          }),
    ]
}