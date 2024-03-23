const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


module.exports = defineConfig({
  publicPath:"./",  //设置静态资源
  transpileDependencies: true,
  // 设置为true时，在保存文件时会自动执行ESlint检查，在此关闭
  lintOnSave:false,
  // 设置css的主入口文件
  css:{
    loaderOptions:{
      scss:{
        additionalData:`@import "./src/styles/styles.scss";`
      }
    }
  },
  configureWebpack:{
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // resolve: {
    //   alias: {
    //     'qrcodejs': 'path/to/node_modules/qrcodejs/dist/qrcode.min.js'
    //   }
    // }
  }
})
