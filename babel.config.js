module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        /**
         * useBuiltIns
         * 默认为false 不对当前js进行填充
         * usage：按需引入polyfill
         * entry:需要我们在项目入口处手动引入 polyfill
         * 需要指定corejs版本
         */
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          chrome: '65'
        }
      }
    ]
  ]
}
