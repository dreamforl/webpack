module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        // 默认为false 不对当前js进行填充
        // usage：依据实际使用的新语法来填充
        // entry:根据要兼容的浏览器来进行填充（不管实际用没用），不过在设置的时候，需要在入口文件中引入核心包
            // import "core-js/stable";
            // import "regenerator-runtime/runtime";
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ]
}