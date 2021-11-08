// 可以对vue的项目进行进一步的配置
// https://cli.vuejs.org/zh/config/

// 一旦设置了代理，并且重新定义了axios
// 先拿到代理的地址，拼接 自定义axios中的baseURL，最后再加其他的
module.exports = {
  devServer: {
    proxy: 'http://121.89.205.189/api' // 只能代理一个地址
    // baseURL: isDev ? '' : 'http://121.89.205.189/api',
    // 如果项目中需要代理多个请求地址的话
    // proxy: {
    //   '/api': {
    //     target: 'http://121.89.205.189/api',
    //     changeOrigin: true, // needed for virtual hosted sites
    //     ws: true, // proxy websockets
    //     pathReWrite: {
    //       '^/api': '' // 以后项目中 以/api 开头的请求，实际上都走了代理 http://121.89.205.189/api
    //     }
    //   },
    //   '/test': {
    //     target: 'http://121.89.205.189/api',
    //     changeOrigin: true, // needed for virtual hosted sites
    //     ws: true, // proxy websockets
    //     pathReWrite: {
    //       '^/test': '' // 以后项目中 以/api 开头的请求，实际上都走了代理 http://121.89.205.189/api
    //     }
    //   }
    // } // baseURL: isDev ? '' : 'http://121.89.205.189/api',
    // /api/list   /test/list
  }
}
