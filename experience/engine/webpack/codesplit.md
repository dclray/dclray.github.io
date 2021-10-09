---
title: code-spliting
date: 2021-10-09
sidebar: auto
---

## code-spliting
```javascript
/**
   * webpack中实现代码分割的两种方式：
   * 1.同步代码：只需要在webpack配置文件总做optimization的配置即可
   * 2.异步代码(import)：异步代码，无需做任何配置，会自动进行代码分割，放置到新的文件中
   */
  optimization: {
    splitChunks: {
      chunks: "all",          //async异步代码分割 initial同步代码分割 all同步异步分割都开启
      minSize: 30000,         //字节 引入的文件大于30kb才进行分割
      //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1,           //模块至少使用次数
      maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
      maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
      automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
      name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
        vendors: {  //自定义打包模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
          filename: 'vendors.js',
        },
        default: { //默认打包模块
          priority: -20,
          reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
          filename: 'common.js'
        }
      }
    }
  }
```
## splitChunks基本配置
1.chunks：分割代码的模式 </br>
async：异步代码分割模式：只分割出异步引入的模块</br>
initial： 同步代码分割模式：只分割同步引入的模块</br>
all：同步异步都分割模式，无论如何引入模块都会进行分割</br>
2.minChunks：模块至少使用次数</br>
当值为2时，代表只引用了一次的模块不做分割打包处理</br>
3.name： 设置为true时，缓存组里面的filename生效，覆盖默认命名方式</br>