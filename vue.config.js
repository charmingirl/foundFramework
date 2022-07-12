

module.exports = {
  devServer: {
    https: false,
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
}
