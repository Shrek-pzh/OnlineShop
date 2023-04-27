const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, // 暂时关闭eslint检查
    devServer: {
        host: "127.0.0.1",
        hot: true,

        // 配置代理服务器，解决跨域问题
        proxy: {
            '/api': {
                target: "http://gmall-h5-api.atguigu.cn",
                // pathRewrite: { '^/api': '' }, 因为接口确实都有 /api,所以无需路径重写
            }
        }
    },
    // vue脚手架貌似已经配置了自动补全拓展名，resolve这个配置项不允许
    // resolve: {
    //     extensions: [".vue", ".js", ".json"],
    // }

    // devtool配置应放在 configureWebpack 的配置对象中，否则会报错
    configureWebpack: {
        devtool: "cheap-source-map"
    }

})
