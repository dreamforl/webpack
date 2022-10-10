const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')
// 后续需要在public中布置静态资源目录的时候使用
// const copyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash:5].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'linux',
      favicon: './public/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:5].css',
    }),
    // 后续需要在assets中布置静态资源目录的时候使用
    // new copyWebpackPlugin({
    //   patterns: [{
    //     //from  指定要直接复制的文件夹
    //     from: './src/assets',
    //     // to   指定目标文件夹，如果不指定的话，与output同级
    //     to: path.join(__dirname, 'build/assets'),
    //     globOptions: {
    //       // 可能会出现多次打包的情况，故需要忽略部分文件，而且必须用**/表示from的路径
    //       // ignore: ['**/index.html', '**/favicon.ico']
    //     }
    //   }]
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff)$/,
        type: 'asset/resource',
        generator: {
          filename: 'iconfont/[name]-[contenthash:5][ext]',
        },
      },
      {
        test: /\.(jpg|svg|png|jpeg|gif)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name]-[contenthash:5][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 9 * 1024,
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // 遇到!import回滚一个loader
              esModule: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 遇到!import回滚一个loader
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    compress: true,
    port: 3001,
    // static: false,
    // open: true,
    allowedHosts: [
      // 跨域方式一，非常简单
      'http://localhost:3000',
      'http://192.168.157.128:3000',
    ],
    proxy: {
      // 跨域方式二，用的很多，较复杂
      '/api': {
        target: 'http://192.168.157.128:3000',
        pathRewrite: {
          '^/api': 'http://192.168.157.128:3000',
        },
      },
    },
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerWebpackPlugin(),
    ],
  },
}
