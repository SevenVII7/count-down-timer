const path = require('path')
const webpack = require("webpack")
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: 'development',
  entry: ['./src/main'],
  output: {
    path: path.join(__dirname, 'dist'),
    asyncChunks: true,
    filename: '[name].[hash].js',
    chunkFilename: '[hash].js',
    assetModuleFilename: '[name].[hash][ext]'
  },
  resolve : {
    extensions : ['.tsx', '.ts', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    }
  },
  // 給 webpack-dev-server 吃的
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        include: path.resolve(__dirname, 'src')
      },
      // webpack5 圖片打包
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]'
        }
      },
      {
        test: /\.txt$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/file/[name][ext]'
        }
      },
      // 解析 scss, sass, css 打包
      {
        test: /\.s[ac]ss$/i,
        // MiniCssExtractPlugin 用來生成 css 並在 html 中引入
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        // style-loader 可以將用到的 css 設定, 用 js 方式插入 <style> 中
        // use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // 解析 html 裡面的東西
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
              {
                tag: "a",
                attribute: "href",
                type: "src",
              },
            ],
          },
        },
      },
    ]
  },
  plugins: [
    // Plugin for HMR
    new webpack.HotModuleReplacementPlugin(),
    // 每次打包清除dist
    new CleanWebpackPlugin(),
    // vue
    new VueLoaderPlugin(),
    // css
    new MiniCssExtractPlugin({
      filename: './assets/css/[name].[hash].css'
    }),
    // html
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ]
}
