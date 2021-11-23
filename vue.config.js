'use strict'
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8090,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
