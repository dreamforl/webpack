// 导入环境变量
const config = require('./config')
const path = require('path')
// 利用merge来合并配置
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')

// 导入公共webpack配置
const base = require('./webpack.config')

// 混合
module.exports = merge(base, {
  mode: 'development',
  plugins: [
    // 定义常量 process.env为config.dev.env
    // 注意：这里的值，如果是字符串就会被当成表达式，
    // 如果是双重字符串，就会被任务时字符串
    new DefinePlugin({
      'process.env': JSON.stringify(config.dev.env),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
