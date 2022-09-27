/*
* 自动引入组件
* */

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
/** 开发环境 */
const DEV = process.env.NODE_ENV !== 'prodBuild';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

//  图片自定义设置
const customOptions = {
    mozjpeg: {
        progressive: true,
        quality: 50
    },
    optipng: {
        enabled: true,
    },
    pngquant: {
        quality: [0.5, 0.65],
        speed: 4
    },
    // 不支持WEBP就不要写这一项
    webp: {
        quality: 75
    }
}

const path = require('path')
const webpack = require('webpack')
const {ElementPlusResolver, VantResolver} = require("unplugin-vue-components/resolvers");

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    devServer: {
        https: false,
        open: true,
        port: 8087
    },
    publicPath: process.env.NODE_ENV === 'prodBuild' ? '/prod/' : './',
    // publicPath: process.env.VUE_APP_PUBLIC_PATH,
    outputDir: "dist",
    assetsDir: "static",
    productionSourceMap: false,
    css:
        {
            loaderOptions: {
                // 配置全局颜色变量sass文件
                scss: {
                    data: `@import "~@/theme.scss";`
                },
                // 配置全局颜色变量les文件
                // less: {
                //     // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                //     modifyVars: {
                //         // 直接覆盖变量 'green': '#3597F0',
                //         // 或者可以通过 less 文件 覆盖 引入的组件的主题（文件路径为绝对路径）
                //         hack: `true; @import "${path.resolve(__dirname,'./override.less')}";`,
                //     },
                // },
            }

        },
    configureWebpack: (config) => {
        const plugins = [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver(), VantResolver()],
            }),
        ]
        config.plugins.push(...plugins)
    },
    chainWebpack: (config) => {
        if (!DEV) {
        // `svg-sprite-loader`: 将svg图片以雪碧图的方式在项目中加载
        config.module
            .rule('svg')
            .test(/.svg$/) // 匹配svg文件
            .include.add(resolve('src/svg')) // 主要匹配src/svg
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader') // 使用的loader，主要要npm该插件
            .options({symbolId: 'svg-[name]'}) // 参数配置
        // 正式环境下，删除console和debugger
        config.optimization
            .minimize(true)
            .minimizer('terser')
            .tap(args => {
                let {terserOptions} = args[0];
                terserOptions.compress.drop_console = true;
                terserOptions.compress.drop_debugger = true;
                return args
            });
        // 分包
        config.optimization.splitChunks({
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 2,
                    priority: 1
                },
                vendor: {
                    name: 'chunk-libs',
                    chunks: 'all',
                    test: /[\/]node_modules[\/]/,
                    priority: 10
                }
            }
        });
        // Ignore all locale files of moment.js
        config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
        if (!DEV) {
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp(productionGzipExtensions),
                threshold: 10240,
                minRatio: 0.8
            }))
        }
        //  图片压缩
        // config.module.rule('images')
        //     .test(/\.(gif|png|jpe?g|svg)$/i)
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options(customOptions)
        //     .end()
    }}
}
