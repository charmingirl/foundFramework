module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    //  兼容低版本浏览器打不开页面的问题
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry',
        'corejs': 3 // 指定 corejs 的版本,如果package.json没有core-js，还需要另外安装
      }
    ]
  ],
  // 异步引入vant (按需配置)
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
