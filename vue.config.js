const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
  }
})
