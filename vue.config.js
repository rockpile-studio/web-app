module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 新增自定义的别名，"@"已经定义为src路径的别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
      }
    }
  }
}