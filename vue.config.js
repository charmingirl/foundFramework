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

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    devServer: {
        https: false,
        open: true,
    },
    publicPath: process.env.NODE_ENV === 'prodBuild' ? '/prod/' : './',
    // publicPath: process.env.VUE_APP_PUBLIC_PATH,
    outputDir: "dist",
    assetsDir: "static",
    productionSourceMap: false,
    css:
        {
            loaderOptions: {
                scss: {
                    data: `@import "~@/theme.scss";`
                },
            }

        },
    chainWebpack: (config) => {
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
        //  图片压缩
        // config.module.rule('images')
        //     .test(/\.(gif|png|jpe?g|svg)$/i)
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options(customOptions)
        //     .end()
    }
}
