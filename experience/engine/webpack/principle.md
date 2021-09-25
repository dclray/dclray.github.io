---
title: 概念原理
date: 2021-09-16
sidebar: auto
---
## module chunk bundle 区别
Chunk在webpack中指一个代码块
### module
我们编写的任何文件，对于webpack来说，都是一个个的模块，在webpack配置文件，有一个module字段，module下有一个rules字段，rules下就是处理模块的规则，配置那类的模块，交给哪类的loader处理
### chunk
chunk是webpack打包过程中，一堆module的集合。webpack的打包是从一个入口文件开始，也可以说是入口模块，入口模块引用其他模块，模块再引用模块，webpack通过引用关系逐个打包模块，这些module就形成了一个Chunk。</br>
如果有多个入口文件，可能会产出多条打包路径，一个路径就会形成一个Chunk。
### chunk vs bundle
Bundle就是我们最终输出的一个或多个打包文件。大多数情况下，一个chunk会生产一个bundle但有时候，也不完全是一对一的关系，比如，我们把devtool配置改成'source-map'，然后只有一个入口文件，也不配置代码分割，这样的配置，会产生一个Chunk，但是会产生两个bundle，main.js，main.js.map</br>
Chunk是过程中的代码块，Bundle是结果的代码块</br>
### 产生Chunk的三种途径
1. entry入口
2. 异步加载模块
3. 代码分割（code spliting)

#### entry 的配置方式有三种，
- 字符串 './src/js/main.js' 这种情况指挥产生一个Chunk（只有entry影响）
- 传递数组['./src/js/main.js','./src/js/other.js']这种情况也指挥产生一个Chunk，webpack会将数组中的代码，最终打包到一个Bundle中，原因是，只产生了一个Chunk
- 传递对象
```javascript entry: {
    main: './src/js/main.js',
    other: './src/js/other.js'
},
output: {
    // path: __dirname + "/public",
    // filename:'bundle.js'
    // 以上2行会报错 

    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "[name].js", //打包后输出文件的文件名

}
``` 
对象中一个字段产生一个Chunk，所以再output中filename不能直接写死。产生两个Chunk，生成两个Bundle

#### 异步产生chunk
```javascript
{
    entry: {
        "index": "pages/index.jsx"
    },
    output: {
         filename: "[name].min.js",
        chunkFilename: "[name].min.js"
    }
}
const myModel = r => require.ensure([], () => r(require('./myVue.vue')), 'myModel')
```
chunkFilename字段，为异步加载的Chunk命名
#### 代码分割产生Chunk
```javascript
module.exports = {
  entry: {
    main: __dirname + "/app/main.js",
    other: __dirname + "/app/two.js",
  },
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "[name].js", //打包后输出文件的文件名
    chunkFilename: '[name].js',
  },

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }

      },
    }
  }
}
```
这个配置会产生5个Chunk，两个入口分别产生一个，runtimeChunk:"single"会将webpack再浏览器运行时需要的代码单独抽离到一个文件，commons下的配置会产生一个Chunk，vender下的配置会产生一个Chunk

## hash chunkhash contenthash 区别
### hash
webpack中如果使用hash的话，即每次修改任何一个文件，所有文件名的hash都将改变。所以一旦修改了一个文件，整个项目的文件缓存都将失败
### chunkhash
根据不同的入口文件进行依赖文件解析，构建对应的Chunk，生成对应的哈希值。但是只有对应css或者js改变，与其关联的文件hash值也会改变，但其内容没有改变

#### contenthash
contenthash是针对文件内容级别的，只有自己模块的内容变了，hash值才改变。
## tree-shaking原理
ES6 module 特点：</br>
- 只能作为模块顶层的语句出现
- import的模块名只能是字符串常量
- import binding是immutable的

ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础</br>
所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6之前的模块化，比如我们可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化